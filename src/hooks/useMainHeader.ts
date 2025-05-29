import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useSidebarStore } from '@/store/sideBarStore'
export const useMainHeader = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore()
  const router = useRouter()
  const { logout } = useAuthStore()

  const handleLogout = () => {

    document.cookie = 'intisafsonjack=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    logout()
    router.push('/login')
  }

  return { isSidebarOpen, toggleSidebar, handleLogout }
}
