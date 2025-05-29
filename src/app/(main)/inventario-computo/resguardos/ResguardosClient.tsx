"use client";

import { useState } from "react";
import { PATH_PAGE } from "@/routes/paths";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Card from "@/components/common/Card";
import { DataTable } from "@/components/ui/data-table";
import ListaResguardosTableToolBar from "@/components/inventario/resguardos/ListaResguardosTableToolBar";
import { useResguardos } from "@/hooks/inventario/resguardos/useResguardos";
import { ResguardosColumns as columns } from "@/components/inventario/resguardos/ListaResguardosTableColumns";
import { useEmpleados } from "@/hooks/empleados/useEmpleados";
import SearchDialog from "@/components/ui/sarch-dialog";
import { useAsignaciones } from "@/hooks/inventario/asignaciones/useAsignaciones";
import BaseModal from "@/components/common/base-modal"; 
import { useCreateEditResguardos } from "@/hooks/inventario/resguardos/useCreateEditResguardos";
import { SearchItem } from "@/components/ui/sarch-dialog";
import ResguardoEmpleado from "@/components/inventario/resguardos/ResguardoDetails";
export default function ResguardosClient() {
  const {
    resguardosData,
    totalItems,
    isLoading,
    search,
    pagination,
    handlePageSizeChange,
    handlePageChange,
    handleSearchChange,
  } = useResguardos();

  const {
    asignacionesData,
    handleSearchChange: handleSearchChangeAsignaciones,
  } = useAsignaciones();

  const {
    onSubmit,
    isEdit,
    onDelete,
    resguardoSelected,
    onRowClick,
    openModalDetails,
    setOpenModalDetails,
  } = useCreateEditResguardos();

  const asignacionesDataSearch = asignacionesData?.map((asignacion) => ({
    id: asignacion.idEmpleado,
    descripcion: asignacion.nombre + " " + asignacion.apellido,
    subDescripcion: asignacion.departamento,
    clave: 'Asignados: ' + asignacion.totalEquipos.toString(),
  }));

  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [asignacionSelected, setAsignacionSelected] = useState<SearchItem>();
  const handleOpenModalCrear = (asignacion: SearchItem) => {
    setOpenModalDelete(true);
    setAsignacionSelected(asignacion);
  }

  return (
    <>
      <PageHeader
        heading="Listado de Resguardos"
        links={[
          { name: "Inventario de Cómputo", href: PATH_PAGE.root },
          { name: "Listado de Resguardos", href: PATH_PAGE.inventarioComputo.listadoResguardos },
        ]}
        action={
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Resguardo
          </Button>
        }
      />

      <Card className="my-6 space-y-4">
        <ListaResguardosTableToolBar search={search} handleSearchChange={handleSearchChange} />
        <DataTable
          columns={columns}
          data={resguardosData}
          isLoading={isLoading}
          pageSize={pagination.pageSize}
          currentPage={pagination.pageNumber}
          totalItems={totalItems}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          onRowClick={onRowClick}
          dense
        />
      </Card>

      {asignacionesData && openModal && (
        <SearchDialog
          open={openModal}
          onOpenChange={setOpenModal}
          items={asignacionesDataSearch}
          onSelectItem={(asignacion) => {
            handleOpenModalCrear(asignacion);
          }}
          onSearchChange={handleSearchChangeAsignaciones}
        />
      )}

      <BaseModal open={openModalDelete} onClose={() => setOpenModalDelete(false)} title={`Estas a punto de crear un resguardo para el empleado ${asignacionSelected?.descripcion}`}
        description={`¿Estás seguro de querer crear un resguardo para el empleado ${asignacionSelected?.descripcion}? Esta acción es irreversible.`} footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModalDelete(false)}>Cancelar</Button>
            <Button className="bg-green-100 text-green-800 hover:bg-green-100" onClick={() => {
              if (asignacionSelected) {
                onSubmit(asignacionSelected);
              }
            }}>Crear</Button>
          </div>
        }>
      </BaseModal>
      <BaseModal open={openModalDetails} onClose={() => setOpenModalDetails(false)} className="max-w-7xl" title={`Detalles de resguardo`} footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModalDetails(false)}>Cancelar</Button>
          </div>
        }>
        {resguardoSelected && <ResguardoEmpleado resguardoId={resguardoSelected.id} onClose={() => setOpenModalDetails(false)} />}
      </BaseModal>
    </>
  );
}
