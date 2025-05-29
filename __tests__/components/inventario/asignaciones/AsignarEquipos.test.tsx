import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import AsignarEquipos from "@/components/inventario/asignaciones/detalles/AsignarEquipos"
import "@testing-library/jest-dom"

// Mocks
jest.mock("@/hooks/inventario/equipos/useEquipos", () => ({
  useEquipos: () => ({
    equiposData: [
      { id: 1, clave: "EQ001", descripcion: "Laptop Dell" },
      { id: 2, clave: "EQ002", descripcion: "Monitor HP" }
    ],
    handleSearchChange: jest.fn(),
  }),
}))

const mockUseAsignacionesDetalles = jest.fn()
jest.mock("@/hooks/inventario/asignaciones/useAsignacionesDetalles", () => ({
  useAsignacionesDetalles: (EmpleadoId: string) => mockUseAsignacionesDetalles(EmpleadoId),
}))

jest.mock("@/components/inventario/equipos/ListaEquiposTableColumns", () => ({
  EquiposColumns: [],
}))

jest.mock("@/components/inventario/equipos/EquipoDetails", () => () => <div>Detalles del equipo</div>)

// Mock Combobox
jest.mock("@/components/ui/combobox", () => ({
  Combobox: ({ onChange, onInputChange, options }: any) => (
    <select data-testid="combobox" onChange={(e: any) => onChange(e.target.value)} onInput={(e: any) => onInputChange(e.target.value)}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}))

describe("AsignarEquipos component", () => {
  const mockAsignarEquipos = jest.fn()

  beforeEach(() => {
    mockUseAsignacionesDetalles.mockReturnValue({
      selectedEquipos: [],
      handleEquipoSelect: jest.fn(),
      selectedEquiposData: [],
      selectedEquipo: null,
      setSelectedEquipos: jest.fn(),
      openModal: false,
      setOpenModal: jest.fn(),
    })
  })

  it("debe renderizar correctamente sin equipos seleccionados", () => {
    render(<AsignarEquipos asignarEquipos={mockAsignarEquipos} EmpleadoId="123" />)
    expect(screen.getByText("Buscar y seleccionar equipos:")).toBeInTheDocument()
    expect(screen.getByText("No hay equipos seleccionados")).toBeInTheDocument()
  })

  it("debe permitir seleccionar un equipo desde el combobox", () => {
    render(<AsignarEquipos asignarEquipos={mockAsignarEquipos} EmpleadoId="123" />)
    const select = screen.getByTestId("combobox")
    fireEvent.change(select, { target: { value: "1" } })
    expect(select).toHaveValue("1")
  })

  it("debe ejecutar la función asignarEquipos cuando se hace clic en Asignar equipos", () => {
    mockUseAsignacionesDetalles.mockReturnValueOnce({
      selectedEquipos: [1],
      handleEquipoSelect: jest.fn(),
      selectedEquiposData: [{ id: 1, clave: "EQ001", descripcion: "Laptop Dell" }],
      selectedEquipo: null,
      setSelectedEquipos: jest.fn(),
      openModal: false,
      setOpenModal: jest.fn(),
    })

    render(<AsignarEquipos asignarEquipos={mockAsignarEquipos} EmpleadoId="123" />)

    const button = screen.getByText("Asignar equipos")
    fireEvent.click(button)
    expect(mockAsignarEquipos).toHaveBeenCalledWith([{ id: 1, clave: "EQ001", descripcion: "Laptop Dell" }])
  })
})
