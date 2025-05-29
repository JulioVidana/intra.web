"use client"
import React from "react"
import { Plus } from "lucide-react"
import Card from "@/components/common/Card"
import { DataTable } from "@/components/ui/data-table"
import { TipoEquiposColumns as columns } from "@/components/inventario/catalogos/tipoEquipos/TipoEquiposTableColumns"
import { useTipoEquipos } from "@/hooks/inventario/catInventario/useTipoEquipos"
import { TipoEquiposTableToolBar } from "@/components/inventario/catalogos/tipoEquipos/TipoEquiposTableToolBar"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { PATH_PAGE } from "@/routes/paths"
import BaseModal from "@/components/common/base-modal"
import TipoEquipoForm from "@/components/inventario/catalogos/tipoEquipos/TipoEquipoForm"


export default function CatEquiposClient() {
  const {
    tipoEquiposData,
    isLoading,
    totalItems,
    pagination,
    search,
    handleSearchChange,
    handlePageSizeChange,
    handlePageChange,
    openModal,
    setOpenModal
  } = useTipoEquipos()

  return (
    <div>
      <PageHeader
        heading="Catálogo de Equipos"
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
            name: "Catalogo de Equipos",
            href: PATH_PAGE.inventarioComputo.catalogoEquipo
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

        <TipoEquiposTableToolBar search={search} handleSearchChange={handleSearchChange} />
        <DataTable
          columns={columns}
          data={tipoEquiposData}
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
        <TipoEquipoForm onSuccess={() => setOpenModal(false)} />
      </BaseModal>
    </div>
  )
} 