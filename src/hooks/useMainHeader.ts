import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useSidebarStore } from '@/store/sideBarStore'
export const useMainHeader = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore()
  const router = useRouter()
  const { clearUser, user } = useAuthStore()

  const handleLogout = async () => {
    await clearUser()
    router.push('/login')
  }

  return { isSidebarOpen, toggleSidebar, handleLogout, user }
}
