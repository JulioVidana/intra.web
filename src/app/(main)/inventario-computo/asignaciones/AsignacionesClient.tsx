"use client"
import React from "react"
import { Plus } from "lucide-react"
import Card from "@/components/common/Card"
import { DataTable } from "@/components/ui/data-table"
import { AsignacionesColumns as columns } from "@/components/inventario/asignaciones/ListaAsignacionesTableColumns"
import ListaAsignacionesTableToolBar from "@/components/inventario/asignaciones/ListaAsignacionesTableToolBar"
import { useAsignaciones } from "@/hooks/inventario/asignaciones/useAsignaciones"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { PATH_PAGE } from "@/routes/paths"
import { useRouter } from "next/navigation"
import SearchDialog from "@/components/ui/sarch-dialog" 
import { useEmpleados } from "@/hooks/empleados/useEmpleados"
export default function AsignacionesClient() {
  const router = useRouter()
  const {
    asignacionesData,
    isLoading,
    totalItems,
    pagination,
    search,
    handleSearchChange,
    handlePageSizeChange,
    handlePageChange,
    setOpenModal,
    openModal
  } = useAsignaciones()

  const {
    empleadoDataSelect,
  } = useEmpleados();
  return (
    <div>
      <PageHeader
        heading="Asignaciones de Equipos"
        links={[
          {
            name: "Inventario de Cómputo",
            href: PATH_PAGE.root
          },
          {
            name: "Listado de Asignaciones",
            href: PATH_PAGE.inventarioComputo.listadoAsignaciones
          }
        ]}
        action={
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Asignación
          </Button>
        }
        subHeading={[]} />

      <Card className="my-6 space-y-4">

        <ListaAsignacionesTableToolBar search={search} handleSearchChange={handleSearchChange} />
        <DataTable
          columns={columns}
          data={asignacionesData}
          isLoading={isLoading}
          pageSize={pagination.pageSize}
          currentPage={pagination.pageNumber}
          totalItems={totalItems}
          onRowClick={(row)=>router.push(`${PATH_PAGE.inventarioComputo.listadoAsignaciones}/${row.idEmpleado}`)}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          dense
        />
      </Card>
      {empleadoDataSelect && openModal && (
        <SearchDialog
          open={openModal}
          onOpenChange={setOpenModal}
          items={empleadoDataSelect}
          onSelectItem={(empleado) => {
            router.push(`${PATH_PAGE.inventarioComputo.listadoAsignaciones}/${empleado.id}`)
          }}   
        />
      )}
    </div>
  )
} 