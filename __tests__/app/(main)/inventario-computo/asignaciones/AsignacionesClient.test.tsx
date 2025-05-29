import { render, screen } from "@testing-library/react"
import AsignacionesClient from "@/app/(main)/inventario-computo/asignaciones/page"
import { useAsignaciones } from "@/hooks/inventario/asignaciones/useAsignaciones"
import { useEmpleados } from "@/hooks/empleados/useEmpleados"
import { useRouter } from "next/navigation"

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}))

jest.mock("@/hooks/inventario/asignaciones/useAsignaciones", () => ({
  useAsignaciones: jest.fn(),
}))

jest.mock("@/hooks/empleados/useEmpleados", () => ({
  useEmpleados: jest.fn(),
}))

jest.mock("@/components/inventario/asignaciones/ListaAsignacionesTableToolBar", () => () => (
  <div data-testid="toolbar">Toolbar</div>
))

jest.mock("@/components/ui/data-table", () => ({
  DataTable: () => <div data-testid="datatable">DataTable</div>,
}))

jest.mock("@/components/ui/sarch-dialog", () => () => (
  <div data-testid="search-dialog">SearchDialog</div>
))

jest.mock("@/components/layout/PageHeader", () => ({ heading, action }: any) => (
  <div>
    <h1>{heading}</h1>
    <div data-testid="action">{action}</div>
  </div>
))

describe("AsignacionesClient", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    ;(useAsignaciones as jest.Mock).mockReturnValue({
      asignacionesData: [],
      isLoading: false,
      totalItems: 0,
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
      search: "",
      handleSearchChange: jest.fn(),
      handlePageSizeChange: jest.fn(),
      handlePageChange: jest.fn(),
      openModal: false,
      setOpenModal: jest.fn(),
    })

    ;(useEmpleados as jest.Mock).mockReturnValue({
      empleadoDataSelect: [],
    })
  })

  it("renderiza correctamente encabezado, botón, toolbar y tabla", () => {
    render(<AsignacionesClient />)

    expect(screen.getByText("Asignaciones de Equipos")).toBeInTheDocument()
    expect(screen.getByText("Nueva Asignación")).toBeInTheDocument()
    expect(screen.getByTestId("toolbar")).toBeInTheDocument()
    expect(screen.getByTestId("datatable")).toBeInTheDocument()
  })

  it("muestra el modal SearchDialog si openModal y empleadoDataSelect están activos", () => {
    ;(useAsignaciones as jest.Mock).mockReturnValue({
      asignacionesData: [],
      isLoading: false,
      totalItems: 0,
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
      search: "",
      handleSearchChange: jest.fn(),
      handlePageSizeChange: jest.fn(),
      handlePageChange: jest.fn(),
      openModal: true,
      setOpenModal: jest.fn(),
    })

    ;(useEmpleados as jest.Mock).mockReturnValue({
      empleadoDataSelect: [
        { id: 1, nombre: "Empleado de prueba" },
      ],
    })

    render(<AsignacionesClient />)

    expect(screen.getByTestId("search-dialog")).toBeInTheDocument()
  })
})
