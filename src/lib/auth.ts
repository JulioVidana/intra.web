import { useAuthStore } from '@/store/authStore'

export async function checkAuth() {
  if (typeof window === 'undefined') {
    return null
  }

  const cookieName = 'intisafsonjack'
  const cookies = document.cookie.split(';')
  const authCookie = cookies.find(cookie => cookie.trim().startsWith(`${cookieName}=`))

  if (authCookie) {
    const store = useAuthStore.getState()
    if (store.user) {
      return store.user
    }
  }

  useAuthStore.getState().clearUser()
  return null
}