import { render, screen, fireEvent } from "@testing-library/react"
import { HistorialResguardos } from "@/components/inventario/resguardos/ResguardoHistorial"
import { Resguardo, ResguardoStatus } from "@/services/api/inventario-computo/models/Resguardos"
import renderWithClient from "../../../__mock__/QueryClientProvider"

jest.mock("@/components/inventario/resguardos/ResguardoDetails", () => ({
  __esModule: true,
  default: () => <div data-testid="resguardo-details">Detalles del Resguardo</div>,
}))

jest.mock("@/components/common/base-modal", () => ({
  __esModule: true,
  default: ({ open, children }: { open: boolean; children: React.ReactNode }) =>
    open ? <div data-testid="modal-content">{children}</div> : null,
}))

const resguardosMock: Resguardo[] = [
  {
    id: 1,
    empleadoId: 100,
    empleado: "Juan Pérez",
    notas: "Resguardo pendiente",
    equipos: [],
    estatus: ResguardoStatus.Archivado,
    nombreDoc: "resguardo1.pdf",
    createdBy: "admin",
    modifiedBy: "editor",
    fecha: new Date(),
    created: new Date(),
    modified: new Date(),
  },
  {
    id: 2,
    empleadoId: 100,
    empleado: "Juan Pérez",
    notas: "Resguardo completado",
    equipos: [],
    estatus: ResguardoStatus.Completado,
    nombreDoc: "resguardo2.pdf",
    createdBy: "admin",
    modifiedBy: "editor",
    fecha: new Date(),
    created: new Date(),
    modified: new Date(),
  },
]

describe("HistorialResguardos", () => {
  it("renderiza el nombre del empleado y los tabs", () => {
    renderWithClient(<HistorialResguardos resguardos={resguardosMock} />)

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument()
    expect(screen.getByText("Todos (2)")).toBeInTheDocument()
    expect(screen.getByText("Archivados (1)")).toBeInTheDocument()
    expect(screen.getByText("Completados (1)")).toBeInTheDocument()
  })

  it("muestra las tarjetas de resguardo", () => {
    renderWithClient(<HistorialResguardos resguardos={resguardosMock} />)

    expect(screen.getByText("Resguardo #1")).toBeInTheDocument()
    expect(screen.getByText("Resguardo #2")).toBeInTheDocument()
  })

  it("abre el modal al hacer clic en una tarjeta", () => {
    renderWithClient(<HistorialResguardos resguardos={resguardosMock} />)

    const card = screen.getByText("Resguardo #1")
    fireEvent.click(card)

    expect(screen.getByTestId("modal-content")).toBeInTheDocument()
    expect(screen.getByTestId("resguardo-details")).toBeInTheDocument()
  })

  it("muestra estado vacío si no hay resguardos", () => {
    renderWithClient(<HistorialResguardos resguardos={[]} />)

    expect(screen.getByText("No se encontraron resguardos")).toBeInTheDocument()
  })
})
