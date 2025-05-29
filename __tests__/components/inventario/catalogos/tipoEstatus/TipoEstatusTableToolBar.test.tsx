import { render, screen, fireEvent } from '@testing-library/react'
import { TipoEstatusTableToolBar } from '@/components/inventario/catalogos/tipoEstatus/TipoEstatusTableToolBar'

jest.mock('lucide-react', () => ({
  SearchIcon: () => <svg data-testid="search-icon" />,
}))

describe('TipoEstatusTableToolBar', () => {
  it('renderiza el input con placeholder y el ícono de búsqueda', () => {
    render(
      <TipoEstatusTableToolBar search="" handleSearchChange={() => {}} />
    )

    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('llama a handleSearchChange cuando se escribe en el input', () => {
    const mockHandleSearchChange = jest.fn()

    render(
      <TipoEstatusTableToolBar
        search=""
        handleSearchChange={mockHandleSearchChange}
      />
    )

    const input = screen.getByPlaceholderText('Buscar por nombre...')
    fireEvent.change(input, { target: { value: 'activo' } })

    expect(mockHandleSearchChange).toHaveBeenCalledWith('activo')
  })
})
