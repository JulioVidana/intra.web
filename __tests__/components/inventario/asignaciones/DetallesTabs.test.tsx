import { render, screen, fireEvent } from "@testing-library/react"
import DetallesTabs from "@/components/inventario/asignaciones/detalles/DetallesTabs"
import type { Asignaciones } from "@/services/api/inventario-computo/models/Asignaciones"
import type { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import renderWithClient from "../../../__mock__/QueryClientProvider"

describe("Componente DetallesTabs", () => {
  



  const mockEquiposAsignados: Equipos[] = [
    {
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
    },
    {
      id: 2,
      statusId: 1,
      statusNombre: "Activo",
      tiposEquiposId: 2,
      tipoEquipoNombre: "Monitor",
      subEquiposId: 2,
      subEquipoNombre: "Monitor LED",
      claveSIIF: "SIIF-002",
      descripcion: "Monitor 27 pulgadas",
      clave: "MON001",
      numSerie: "456DEF",
      observaciones: "Ninguna",
      caracteristicas: "27 pulgadas, 1440p",
      ubicacion: "Oficina 101",
      fechaBaja: "",
      createdBy: "admin",
      modifiedBy: "admin",
      created: "2024-01-01",
      modified: "2024-01-01"
    }
  ]

  const mockAsignacionesData: Asignaciones = {
    id: 1,
    idEmpleado: 1,
    nombre: "Juan",
    apellido: "Pérez",
    numeroEmpleado: "EMP123",
    email: "juan.perez@empresa.com",
    telefono: "555-0123",
    departamento: "Sistemas",
    totalEquipos: 2,
    equiposAsignados: mockEquiposAsignados
  }

  it("se renderiza sin errores", () => {
    renderWithClient(<DetallesTabs asignacionesData={mockAsignacionesData} EmpleadoId="123" />)
    expect(screen.getByText("Todos")).toBeInTheDocument()
  })

  it("muestra todos los equipos en la pestaña Todos", () => {
    renderWithClient(<DetallesTabs asignacionesData={mockAsignacionesData} EmpleadoId="123" />)
    
    fireEvent.click(screen.getByText("Todos"))
    expect(screen.getByText(/PC001/)).toBeInTheDocument()
    expect(screen.getByText(/MON001/)).toBeInTheDocument()
  })

  it("maneja correctamente datos vacíos", () => {
    const emptyData: Asignaciones = {
      ...mockAsignacionesData,
      equiposAsignados: []
    }
    
    renderWithClient(<DetallesTabs asignacionesData={emptyData} EmpleadoId="123" />)
    expect(screen.getByText("Todos los equipos asignados")).toBeInTheDocument()
  })
})
