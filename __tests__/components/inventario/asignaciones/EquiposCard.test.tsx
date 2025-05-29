import { render, screen, fireEvent } from "@testing-library/react"
import EquipoCard from "@/components/inventario/asignaciones/detalles/EquiposCard"
import { Cpu } from "lucide-react"
import type { Equipos } from "@/services/api/inventario-computo/models/Equipos"

describe("Componente EquipoCard", () => {
  const mockEquipo: Equipos = {
    id: 1,
    statusId: 1,
    statusNombre: "Activo",
    tiposEquiposId: 1,
    tipoEquipoNombre: "Computadora",
    subEquiposId: 1,
    subEquipoNombre: "Desktop",
    claveSIIF: "SIIF-001",
    descripcion: "Computadora de escritorio",
    clave: "PC001",
    numSerie: "123ABC",
    observaciones: "Ninguna",
    caracteristicas: "8GB RAM, 256GB SSD",
    ubicacion: "Oficina 101",
    fechaBaja: "",
    createdBy: "admin",
    modifiedBy: "admin",
    created: "2024-01-01",
    modified: "2024-01-01"
  }

  it("se renderiza sin errores", () => {
    render(<EquipoCard equipo={mockEquipo} icon={<Cpu />} />)
    expect(screen.getByText("Computadora de escritorio")).toBeInTheDocument()
  })

  it("muestra la información básica del equipo", () => {
    render(<EquipoCard equipo={mockEquipo} icon={<Cpu />} />)
    expect(screen.getByText("Computadora")).toBeInTheDocument()
    expect(screen.getByText("PC001")).toBeInTheDocument()
    expect(screen.getByText("123ABC")).toBeInTheDocument()
  })

  it("muestra el estado del equipo con el badge correcto", () => {
    render(<EquipoCard equipo={mockEquipo} icon={<Cpu />} />)
    const badge = screen.getByText("Activo")
    expect(badge).toBeInTheDocument()
  })


  it("abre el modal al hacer clic en Ver detalles", () => {
    render(<EquipoCard equipo={mockEquipo} icon={<Cpu />} />)
    const verDetallesButton = screen.getByText("Ver detalles")
    fireEvent.click(verDetallesButton)
    expect(screen.getByText("Detalles del equipo")).toBeInTheDocument()
  })

  it("muestra la fecha de baja cuando existe", () => {
    const equipoConBaja = {
      ...mockEquipo,
      fechaBaja: "2024-03-15"
    }
    render(<EquipoCard equipo={equipoConBaja} icon={<Cpu />} />)
    expect(screen.getByText("Fecha de baja:")).toBeInTheDocument()
    expect(screen.getByText("2024-03-15")).toBeInTheDocument()
  })

  it("no muestra la fecha de baja cuando está vacía", () => {
    render(<EquipoCard equipo={mockEquipo} icon={<Cpu />} />)
    expect(screen.queryByText("Fecha de baja:")).not.toBeInTheDocument()
  })

})
