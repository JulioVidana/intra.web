import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserData {
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  userData: UserData | null
  login: (userData: UserData) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userData: null,
      login: (userData: UserData) => set({ isAuthenticated: true, userData }),
      logout: () => set({ isAuthenticated: false, userData: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)