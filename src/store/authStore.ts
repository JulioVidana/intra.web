import { create } from 'zustand';
import { API } from '@/services/api/API';
import { User } from '@/services/api/auth/model/Authorization';
import { createJSONStorage, persist } from 'zustand/middleware';  

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: User) => set({ user, isAuthenticated: true }),
    setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    clearUser: async () => {
      try {
        await API.auth.logOff();
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        set({ user: null, isAuthenticated: false });
      }
    },
  }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
