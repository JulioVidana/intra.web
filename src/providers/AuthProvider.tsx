"use client"
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { API } from '@/services/api/API'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setUser } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const verifyAuth = async () => {
      try {
        const response = await API.auth.verifyAuth()
        
        if (mounted) {
          if (response?.success) {
            setUser(response.user)
          } else if (window.location.pathname !== '/login') {
            router.push('/login')
          }
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
        if (mounted && window.location.pathname !== '/login') {
          router.push('/login')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    verifyAuth()

    return () => {
      mounted = false
    }
  }, [])

  if (isLoading) {
    return null // o un componente de loading
  }

  return <>{children}</>
}