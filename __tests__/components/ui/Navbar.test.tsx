import { render, screen } from '@testing-library/react'
import Navbar from '@/components/layout/Navbar'
import { useSidebarStore } from '@/store/sideBarStore'


jest.mock('@/store/sideBarStore', () => ({
  useSidebarStore: jest.fn(),
}))


jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('Navbar', () => {
  beforeEach(() => {

    (useSidebarStore as unknown as jest.Mock).mockReturnValue({
      isSidebarOpen: false,
      toggleSidebar: jest.fn(),
    })
  })

  it('renderiza el texto "Intranet"', () => {
    render(<Navbar />)
    expect(screen.getByText('Intranet')).toBeInTheDocument()
  })
})
