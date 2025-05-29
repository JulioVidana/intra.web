import { render, screen, fireEvent } from "@testing-library/react"
import { EquiposList } from "@/components/inventario/asignaciones/detalles/EquiposList"
import type { ColumnDef } from "@tanstack/react-table"
import type { Equipos } from "@/services/api/inventario-computo/models/Equipos"

const mockEquipos: Equipos[] = [
  {
    id: 1,
    statusId: 1,
    statusNombre: "Activo",
    tiposEquiposId: 10,
    tipoEquipoNombre: "Laptops",
    subEquiposId: 1,
    subEquipoNombre: "Laptop Dell",
    claveSIIF: "SIIF001",
    descripcion: "Laptop Dell",
    clave: "EQ001",
    numSerie: "SN123456",
    observaciones: "Nuevo equipo",
    caracteristicas: "Intel i7, 16GB RAM",
    ubicacion: "Oficina Central",
    fechaBaja: "",
    createdBy: "admin",
    modifiedBy: "admin",
    created: "2024-01-01",
    modified: "2024-01-01",
    isAsignado: false,
    empleadoAsignado: "",
    departamentoEmpleadoAsignado: ""
  },
  {
    id: 2,
    statusId: 1,
    statusNombre: "Activo",
    tiposEquiposId: 20,
    tipoEquipoNombre: "Monitores",
    subEquiposId: 2,
    subEquipoNombre: "Monitor HP",
    claveSIIF: "SIIF002",
    descripcion: "Monitor HP",
    clave: "EQ002",
    numSerie: "SN789012",
    observaciones: "Monitor 24 pulgadas",
    caracteristicas: "24 pulgadas, Full HD",
    ubicacion: "Oficina Central",
    fechaBaja: "",
    createdBy: "admin",
    modifiedBy: "admin",
    created: "2024-01-01",
    modified: "2024-01-01",
    isAsignado: false,
    empleadoAsignado: "",
    departamentoEmpleadoAsignado: ""
  }
]

const mockColumns: ColumnDef<Equipos>[] = [
  {
    accessorKey: "clave",
    header: "Clave",
    cell: info => info.getValue(),
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: info => info.getValue(),
  }
]

describe("EquiposList", () => {
  it("renderiza equipos en la tabla", () => {
    render(
      <EquiposList
        equiposColumns={mockColumns}
        equipos={mockEquipos}
        isLoading={false}
        pageKey={null}
        handlePageNextChange={() => {}}
        hasNextPage={false}
        isFetchingNextPage={false}
      />
    )

    expect(screen.getByText("EQ001")).toBeInTheDocument()
    expect(screen.getByText("Monitor HP")).toBeInTheDocument()
    expect(screen.getByText("Resultados: 2")).toBeInTheDocument()
  })

  it("muestra el botón 'Load More' si hay más páginas", () => {
    render(
      <EquiposList
        equiposColumns={mockColumns}
        equipos={mockEquipos}
        isLoading={false}
        pageKey={null}
        handlePageNextChange={() => {}}
        hasNextPage={true}
        isFetchingNextPage={false}
      />
    )

    expect(screen.getByRole("button", { name: /load more/i })).toBeInTheDocument()
  })

  it("desactiva el botón 'Load More' si está cargando", () => {
    render(
      <EquiposList
        equiposColumns={mockColumns}
        equipos={mockEquipos}
        isLoading={false}
        pageKey={null}
        handlePageNextChange={() => {}}
        hasNextPage={true}
        isFetchingNextPage={true}
      />
    )

    const button = screen.getByRole("button", { name: /loading/i })
    expect(button).toBeDisabled()
  })

  it("abre el modal al hacer clic en una fila", () => {
    render(
      <EquiposList
        equiposColumns={mockColumns}
        equipos={mockEquipos}
        isLoading={false}
        pageKey={null}
        handlePageNextChange={() => {}}
        hasNextPage={false}
        isFetchingNextPage={false}
      />
    )

    const row = screen.getByText("EQ001")
    fireEvent.click(row)

    expect(screen.getByText("Detalles del equipo")).toBeInTheDocument()
  })
})
