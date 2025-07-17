// import { cookies } from 'next/headers';
// import jwtDecode from 'jwt-decode';
// import dayjs from 'dayjs';

// /** Kiểu payload JWT tuỳ backend */
// interface JwtPayload {
//   exp?: number;        
//   iat?: number;
//   userId: string;
// }

// /**
//  * Gọi thẳng backend để lấy access‑token mới.
//  * Tách hàm riêng để có thể dùng từ bất kỳ file server‑side nào.
//  */
// async function refreshAccessToken(refreshToken: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/refresh`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ refreshToken }),
//       cache: 'no-store',
//     },
//   );

//   if (!res.ok) throw new Error('Refresh failed');
//   // { accessToken: string, refreshToken: string }
//   return (await res.json()) as { accessToken: string; refreshToken: string };
// }

// /**
//  * Xác thực phiên cho mọi đoạn code server‑side.
//  * - Trả về `{ accessToken, refreshToken }` nếu hợp lệ (đã tự refresh nếu cần).
//  * - Trả về `null` nếu không có (hoặc refresh thất bại).
//  */
// export async function verifySession() {
//   const store = cookies();
//   let accessToken = store.get('accessToken')?.value ?? null;
//   let refreshToken = store.get('refreshToken')?.value ?? null;

//   // 1. Không có token nào ⇒ coi như chưa đăng nhập
//   if (!accessToken && !refreshToken) return null;

//   /** Hàm tiện kiểm tra accessToken còn hạn >= 30 giây */
//   const isAccessTokenValid = (token: string) => {
//     try {
//       const { exp } = jwtDecode<JwtPayload>(token);
//       if (!exp) return false;
//       // cho sớm 30s để tránh race condition
//       return dayjs.unix(exp).subtract(30, 'second').isAfter(dayjs());
//     } catch {
//       return false;
//     }
//   };

//   // 2. Nếu accessToken còn hạn ⇒ trả luôn
//   if (accessToken && isAccessTokenValid(accessToken)) {
//     return { accessToken, refreshToken };
//   }

//   // 3. Hết hạn nhưng vẫn còn refreshToken ⇒ gọi backend refresh
//   if (refreshToken) {
//     try {
//       const fresh = await refreshAccessToken(refreshToken);
//       accessToken = fresh.accessToken;
//       refreshToken = fresh.refreshToken;            // backend xoay RT

//       /* 3a. Ghi lại cookie mới */
//       store.set('accessToken', accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 10, // 10 phút
//       });
//       store.set('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         path: '/',
//         maxAge: 60 * 60 * 24 * 7, // 7 ngày
//       });

//       return { accessToken, refreshToken };
//     } catch {
//       // Refresh thất bại ⇒ xoá cookie & buộc đăng nhập lại
//       store.delete('accessToken');
//       store.delete('refreshToken');
//       return null;
//     }
//   }

//   // 4. Không thể refresh ⇒ xoá cookie cũ
//   store.delete('accessToken');
//   return null;
// }
