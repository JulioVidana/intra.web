import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import ResguardoDetails from "@/components/inventario/resguardos/ResguardoDetails"
import { useResguardos } from "@/hooks/inventario/resguardos/useResguardos"
import { useCreateEditResguardos } from "@/hooks/inventario/resguardos/useCreateEditResguardos"
import renderWithClient from "../../../__mock__/QueryClientProvider"
jest.mock("@/hooks/inventario/resguardos/useResguardos")
jest.mock("@/hooks/inventario/resguardos/useCreateEditResguardos")

const mockResguardoDetallesData = {
  estatus: "Pendiente",
  empleado: "Juan Pérez",
  fecha: new Date().toISOString(),
  nombreDoc: "documento.pdf",
  equipos: [],
  created: new Date().toISOString(),
  modified: new Date().toISOString(),
  createdBy: "admin",
  modifiedBy: "editor",
  notas: "Este es un resguardo de prueba.",
}

describe("ResguardoDetails", () => {
  beforeEach(() => {
    ;(useResguardos as jest.Mock).mockReturnValue({
      resguardoDetallesData: mockResguardoDetallesData,
      isLoadingResguardoDetalles: false,
      errorResguardoDetalles: null,
      refetchResguardoDetalles: jest.fn(),
    })

    ;(useCreateEditResguardos as jest.Mock).mockReturnValue({
      handleUploadFile: jest.fn(),
      handleDeleteFile: jest.fn(),
    })
  })

  it("renderiza correctamente los datos del resguardo", async () => {
    renderWithClient(<ResguardoDetails resguardoId={1} />)

    expect(await screen.findByText(/Resguardo #1/i)).toBeInTheDocument()
    expect(screen.getByText("Asignado a:")).toBeInTheDocument()
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument()
    expect(screen.getByText(/Pendiente/)).toBeInTheDocument()
    expect(screen.getByText(/No hay equipos asignados/)).toBeInTheDocument()
  })

  it("muestra el mensaje de error si hay un error en la carga", () => {
    ;(useResguardos as jest.Mock).mockReturnValue({
      resguardoDetallesData: null,
      isLoadingResguardoDetalles: false,
      errorResguardoDetalles: true,
      refetchResguardoDetalles: jest.fn(),
    })

    renderWithClient(<ResguardoDetails resguardoId={1} />)

    expect(screen.getByText(/Error al cargar los detalles del resguardo/i)).toBeInTheDocument()
  })

  it("muestra el skeleton si está cargando", () => {
    ;(useResguardos as jest.Mock).mockReturnValue({
      resguardoDetallesData: null,
      isLoadingResguardoDetalles: true,
      errorResguardoDetalles: null,
      refetchResguardoDetalles: jest.fn(),
    })

    renderWithClient(<ResguardoDetails resguardoId={1} />)
    expect(screen.getAllByRole("status").length).toBeGreaterThan(0)
  })

  it("permite alternar los detalles adicionales", async () => {
    renderWithClient(<ResguardoDetails resguardoId={1} />)

    const button = screen.getByRole("button", { name: /ver más detalles/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText(/Creado por/i)).toBeInTheDocument()
      expect(screen.getByText(/Modificado por/i)).toBeInTheDocument()
    })
  })
})
