"use client"
import React from "react"
import { Plus } from "lucide-react"
import Card from "@/components/common/Card"
import { DataTable } from "@/components/ui/data-table"
import { TipoEstatusTableColumns as columns } from "@/components/inventario/catalogos/tipoEstatus/TipoEstatusTableColumns"
import { TipoEstatusTableToolBar } from "@/components/inventario/catalogos/tipoEstatus/TipoEstatusTableToolBar"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { PATH_PAGE } from "@/routes/paths"
import { useStatusEquipos } from "@/hooks/inventario/catStatus/useStatusEquipos"
import BaseModal from "@/components/common/base-modal"
import TipoEstatusForm from "@/components/inventario/catalogos/tipoEstatus/TipoEstatusForm"

  export default function CatStatusClient() {
  const {
    statusEquiposData,
    isLoading,
    totalItems,
    pagination,
    search,
    handleSearchChange,
    handlePageSizeChange,
    handlePageChange,
    openModal,
    setOpenModal
  } = useStatusEquipos()

  return (
    <div>
      <PageHeader
        heading="Catálogo de Estatus"
        links={[
          {
            name: "Inventario de Cómputo",
            href: PATH_PAGE.root
          },
          {
            name: "Catálogos",
            href: PATH_PAGE.inventarioComputo.catalogo
          },
          {
            name: "Catalogo de Estatus",
            href: PATH_PAGE.inventarioComputo.catalogoStatus
          }
        ]}
        action={
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo
          </Button>
        }
        subHeading={[]} />

      <Card className="my-6 space-y-4">

        <TipoEstatusTableToolBar search={search} handleSearchChange={handleSearchChange} />
        <DataTable
          columns={columns}
          data={statusEquiposData}
          isLoading={isLoading}
          pageSize={pagination.pageSize}
          currentPage={pagination.pageNumber}
          totalItems={totalItems}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          dense
        />

      </Card>
      <BaseModal open={openModal} onClose={() => setOpenModal(false)} title="Nuevo Equipo">
        <TipoEstatusForm onSuccess={() => setOpenModal(false)} />
      </BaseModal>
    </div>
  )
} 