"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAsignacionesDetalles } from "@/hooks/inventario/asignaciones/useAsignacionesDetalles"

import DetallesTabs from "@/components/inventario/asignaciones/detalles/DetallesTabs"
import PageHeader from "@/components/layout/PageHeader"
import { PATH_PAGE } from "@/routes/paths"
import AsignarEquipos from "@/components/inventario/asignaciones/detalles/AsignarEquipos"
import BaseModal from "@/components/common/base-modal"
import { useParams } from "next/navigation"
import { Equipos } from "@/services/api/inventario-computo/models/Equipos"

export default function AsignacionEmpleadoClient() {
  const params = useParams()
  const empleadoId = params.empleadoId as string
  const { asignacionesData, openModal, setOpenModal, equiposAsignacion, agregarAsignacion} = useAsignacionesDetalles(empleadoId)

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
          },
          {
            name: `${asignacionesData?.nombre}`,
            href: PATH_PAGE.inventarioComputo.listadoAsignaciones
          }
        ]}
        action={
          <Button variant="default" onClick={() => setOpenModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Asignar Equipo
          </Button>
        }
        subHeading={[]} />
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Foto del empleado" />
              <AvatarFallback>{asignacionesData?.nombre.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{asignacionesData?.nombre}</h1>
              <p className="text-muted-foreground">{asignacionesData?.departamento}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">ID: {asignacionesData?.idEmpleado}</Badge>
                <Badge variant="secondary">{asignacionesData?.totalEquipos} equipos asignados</Badge>
              </div>
            </div>
          </div>
        </div>

        {equiposAsignacion.length > 0 || asignacionesData && (
          <DetallesTabs asignacionesData={asignacionesData} EmpleadoId={empleadoId} />
        )}
        {equiposAsignacion.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">El empleado no tiene equipos asignados</p>
          </div>
        )}
      </div>

      <BaseModal open={openModal} className="max-w-5xl" onClose={() => setOpenModal(false)} title="Asignar Equipo">
        <AsignarEquipos asignarEquipos={(equipos: Equipos[]) => agregarAsignacion(equipos)} EmpleadoId={empleadoId} />
      </BaseModal>
      

    </div>
  )
}


