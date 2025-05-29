import { render, screen } from '@testing-library/react'
import CatStatusClient from '@/app/(main)/inventario-computo/catalogo/status/CatStatusClient'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}))

jest.mock('@/hooks/inventario/catStatus/useStatusEquipos', () => ({
  useStatusEquipos: () => ({
    statusEquiposData: [],
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

jest.mock('@/components/inventario/catalogos/tipoEstatus/TipoEstatusTableToolBar', () => ({
  TipoEstatusTableToolBar: ({ search, handleSearchChange }: any) => (
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

describe('CatStatusClient', () => {
  it('renderiza el encabezado y botón "Nuevo"', () => {
    render(<CatStatusClient />)
    expect(screen.getByText('Catálogo de Estatus')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /nuevo/i })).toBeInTheDocument()
  })

  it('renderiza la tabla y el campo de búsqueda', () => {
    render(<CatStatusClient />)
    expect(screen.getByText('DataTable')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })
})
