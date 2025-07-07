import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
    id: string
    name: string
    email: string
    phone: string
    role: string
}

type AuthState = {
    user: any | null
    isAuthenticated: boolean
    loading: boolean
    setUser: (user: any | null) => void
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: true,

            setUser: (user) => set({ user, isAuthenticated: true }),

            logout: async () => {
                try {
                    await fetch('/api/auth/logout', { method: 'POST' });
                } catch (err) {
                    console.error('Logout API failed:', err);
                } finally {
                    set({ user: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)