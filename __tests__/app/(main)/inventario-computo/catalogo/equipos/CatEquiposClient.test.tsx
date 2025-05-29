import { render, screen } from '@testing-library/react'
import CatEquiposClient from '@/app/(main)/inventario-computo/catalogo/equipos/CatEquiposClient'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}))

jest.mock('@/hooks/inventario/catInventario/useTipoEquipos', () => ({
  useTipoEquipos: () => ({
    tipoEquiposData: [],
    totalItems: 0,
    isLoading: false,
    search: '',
    pagination: { pageNumber: 1, pageSize: 10, totalItems: 0 },
    handleSearchChange: jest.fn(),
    handlePageSizeChange: jest.fn(),
    handlePageChange: jest.fn(),
  }),
}))

jest.mock('lucide-react', () => ({
  Plus: () => <svg data-testid="plus-icon" />,
}))

jest.mock('@/components/ui/data-table', () => ({
  DataTable: () => <div>DataTable</div>,
}))

jest.mock('@/components/inventario/catalogos/tipoEquipos/TipoEquiposTableToolBar', () => ({
  TipoEquiposTableToolBar: ({ search, handleSearchChange }: any) => (
    <input
      placeholder="Buscar..."
      value={search}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  ),
}))

jest.mock('@/components/layout/Breadcrumbs', () => () => (
  <nav>
    <a href="/">Inicio</a>
  </nav>
))

describe('CatEquiposClient', () => {
  it('renderiza el título y el botón "Nuevo"', () => {
    render(<CatEquiposClient />)
    expect(screen.getByText('Catálogo de Equipos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /nuevo/i })).toBeInTheDocument()
  })

  it('renderiza la tabla y el campo de búsqueda', () => {
    render(<CatEquiposClient />)
    expect(screen.getByText('DataTable')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })
})
