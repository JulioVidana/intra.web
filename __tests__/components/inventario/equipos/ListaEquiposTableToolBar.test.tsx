import { render, screen, fireEvent } from '@testing-library/react'
import ListaEquiposTableToolBar from '@/components/inventario/equipos/ListaEquiposTableToolBar'


jest.mock('lucide-react', () => ({
  SearchIcon: () => <svg data-testid="search-icon" />,
}))

describe('ListaEquiposTableToolBar', () => {
  it('renderiza el input y el ícono de búsqueda', () => {
    render(
      <ListaEquiposTableToolBar search="" handleSearchChange={() => {}} />
    )

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('dispara handleSearchChange cuando se escribe', () => {
    const mockHandleSearchChange = jest.fn()
    render(
      <ListaEquiposTableToolBar search="" handleSearchChange={mockHandleSearchChange} />
    )

    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'laptop' } })

    expect(mockHandleSearchChange).toHaveBeenCalledWith('laptop')
  })
})
