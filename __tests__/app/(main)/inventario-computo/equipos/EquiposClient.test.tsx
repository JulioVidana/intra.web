import { render, screen, fireEvent } from '@testing-library/react'
import EquiposClient from '@/app/(main)/inventario-computo/equipos/EquiposClient'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}))

jest.mock('@/hooks/inventario/equipos/useEquipos', () => ({
  useEquipos: () => ({
    equiposData: [],
    totalItems: 0,
    isLoading: false,
    search: '',
    pagination: { pageNumber: 1, pageSize: 10, totalItems: 0 },
    setPagination: jest.fn(),
    handlePageSizeChange: jest.fn(),
    handlePageChange: jest.fn(),
    handleSearchChange: jest.fn(),
  }),
}))

jest.mock('lucide-react', () => ({
  Plus: () => <svg data-testid="plus-icon" />,
}))

jest.mock('@/components/inventario/equipos/EquipoForm', () => () => <div>Formulario equipo</div>)

jest.mock('@/components/ui/data-table', () => ({
  DataTable: () => <div>DataTable</div>,
}))

jest.mock('@/components/inventario/equipos/ListaEquiposTableToolBar', () => ({
  __esModule: true,
  default: ({ search, handleSearchChange }: any) => (
    <input
      placeholder="Buscar..."
      value={search}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  ),
}))

jest.mock('@/components/common/base-modal', () => ({
    __esModule: true,
    default: ({ open, children }: any) => (open ? <div data-testid="modal">{children}</div> : null),
  }))
  

jest.mock('@/components/layout/Breadcrumbs', () => () => (
  <nav>
    <a href="/">Inicio</a>
  </nav>
))

describe('EquiposClient', () => {
  it('renderiza el encabezado y botón "Nuevo"', () => {
    render(<EquiposClient />)
    expect(screen.getByText('Listado de Equipos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /nuevo/i })).toBeInTheDocument()
  })

  it('abre el modal al hacer clic en "Nuevo"', () => {
    render(<EquiposClient />)
    fireEvent.click(screen.getByRole('button', { name: /nuevo/i }))
    expect(screen.getByText('Formulario equipo')).toBeInTheDocument()
  })

  it('renderiza la tabla y el campo de búsqueda', () => {
    render(<EquiposClient />)
    expect(screen.getByText('DataTable')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })
})
