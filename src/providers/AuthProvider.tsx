"use client"
import { useEffect } from 'react'
import { checkAuth } from '@/lib/auth'
import { useAuthStore } from '@/store/authStore'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {

    if (!isAuthenticated) {
      checkAuth()
        .then(userData => {
          console.log('Autenticación verificada:', userData ? 'Usuario autenticado' : 'No autenticado')
        })
        .catch(error => {
          console.error('Error al verificar autenticación:', error)
        })
    }
  }, [isAuthenticated])

  return <>{children}</>
} 