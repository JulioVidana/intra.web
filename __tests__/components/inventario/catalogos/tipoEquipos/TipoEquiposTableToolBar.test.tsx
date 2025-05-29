import { render, screen, fireEvent } from '@testing-library/react'
import { TipoEquiposTableToolBar } from '@/components/inventario/catalogos/tipoEquipos/TipoEquiposTableToolBar'

jest.mock('lucide-react', () => ({
  SearchIcon: () => <svg data-testid="search-icon" />,
}))

describe('TipoEquiposTableToolBar', () => {
  it('renderiza el input y el ícono de búsqueda', () => {
    render(
      <TipoEquiposTableToolBar search="" handleSearchChange={() => {}} />
    )

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('llama a handleSearchChange con el valor correcto', () => {
    const mockHandleSearchChange = jest.fn()

    render(
      <TipoEquiposTableToolBar search="" handleSearchChange={mockHandleSearchChange} />
    )

    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'monitor' } })

    expect(mockHandleSearchChange).toHaveBeenCalledWith('monitor')
  })
})
