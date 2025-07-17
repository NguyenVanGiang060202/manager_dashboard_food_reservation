import axios from 'axios'


const api = axios.create({})




// interceptor: nếu bị 401, gọi refresh
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config
    
    // Nếu chưa retry và lỗi là 401
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Gọi /api/auth/refresh ở Next.js (đừng gọi thẳng backend)
        const res = await fetch('/api/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: originalRequest.headers['Authorization']
          })
        })

        if (res.ok) {
          const data = await res.json()
          const newAccessToken = data.accessToken

          // Gắn token mới vào request cũ
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          // Retry request cũ
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Nếu refresh thất bại ⇒ logout
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(err)
  }
)

export default api
