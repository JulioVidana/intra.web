import { render, screen, fireEvent } from "@testing-library/react"
import AsignacionEmpleadoClient from "@/app/(main)/inventario-computo/asignaciones/[empleadoId]/AsignacionEmpleadoClient"
import { useAsignacionesDetalles } from "@/hooks/inventario/asignaciones/useAsignacionesDetalles"


jest.mock("next/navigation", () => {
  return {
    __esModule: true, 
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    })),
    useParams: jest.fn(() => ({ empleadoId: "123" })),
  }
})



jest.mock("@/hooks/inventario/asignaciones/useAsignacionesDetalles", () => ({
  useAsignacionesDetalles: jest.fn(),
}))

describe("AsignacionEmpleadoClient", () => {
  beforeEach(() => {


    (useAsignacionesDetalles as jest.Mock).mockReturnValue({
        isLoading: false,
        asignacionesData: {
          idEmpleado: 123,
          nombre: "Carlos López",
          departamento: "TI",
          totalEquipos: 2,
          equiposAsignados: [
            {
              tiposEquiposId: 1,
              tipoEquipoNombre: "Laptop",
              clave: "EQ-001",
              numSerie: "SN123456",
              descripcion: "Laptop Dell",
              statusNombre: "Asignado",
            },
          ],
        },
        equiposAsignacion: [{}],
        agregarAsignacion: jest.fn(),
        openModal: false,
        setOpenModal: jest.fn(),
      })
      
  })

  it("renderiza nombre del empleado y botón Asignar Equipo", () => {
    render(<AsignacionEmpleadoClient />)
  
    expect(screen.getByRole('heading', { name: 'Carlos López' })).toBeInTheDocument()
    expect(screen.getByText("Asignar Equipo")).toBeInTheDocument()
    expect(screen.getByText("2 equipos asignados")).toBeInTheDocument()
  })
  
})
