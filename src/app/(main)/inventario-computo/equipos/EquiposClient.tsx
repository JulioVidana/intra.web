"use client";

import { useState } from "react";
import { PATH_PAGE } from "@/routes/paths";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Card from "@/components/common/Card";
import { DataTable } from "@/components/ui/data-table";
import ListaEquiposTableToolBar from "@/components/inventario/equipos/ListaEquiposTableToolBar";
import { useEquipos } from "@/hooks/inventario/equipos/useEquipos";
import { EquiposColumns as columns } from "@/components/inventario/equipos/ListaEquiposTableColumns";
import BaseModal from "@/components/common/base-modal";
import EquipoForm from "@/components/inventario/equipos/EquipoForm";

export default function EquiposClient() {
  const {
    equiposData,
    totalItems,
    isLoading,
    search,
    pagination,
    handlePageSizeChange,
    handlePageChange,
    handleSearchChange,
  } = useEquipos();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <PageHeader
        heading="Listado de Equipos"
        links={[
          { name: "Inventario de Cómputo", href: PATH_PAGE.root },
          { name: "Listado de Equipos", href: PATH_PAGE.inventarioComputo.listadoEquipos },
        ]}
        action={
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo
          </Button>
        }
      />

      <Card className="my-6 space-y-4">
        <ListaEquiposTableToolBar search={search} handleSearchChange={handleSearchChange} />
        <DataTable
          columns={columns}
          data={equiposData}
          isLoading={isLoading}
          pageSize={pagination.pageSize}
          currentPage={pagination.pageNumber}
          totalItems={totalItems}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          dense
        />
      </Card>

      <BaseModal open={openModal} onClose={() => setOpenModal(false)} title="Dar de alta equipo">
        <EquipoForm onSuccess={() => setOpenModal(false)} />
      </BaseModal>
    </>
  );
}
