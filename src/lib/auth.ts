import { useAuthStore } from '@/store/authStore'

export async function checkAuth() {
 
  if (typeof window === 'undefined') {
    return null
  }

  const cookieName = 'intisafsonjack'
  const cookies = document.cookie.split(';')
  const authCookie = cookies.find(cookie => cookie.trim().startsWith(`${cookieName}=`))

  if (authCookie) {
    try {
    
      const response = await fetch('/api/me', {
        headers: {
          'Authorization': `Bearer ${authCookie.split('=')[1]}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        useAuthStore.getState().login(userData)
        return userData
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error)
    }
  }

  return null
} 