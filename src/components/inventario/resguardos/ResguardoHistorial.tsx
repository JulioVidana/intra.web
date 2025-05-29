"use client"

import { useState } from "react"
import { Archive, CalendarIcon, CheckCircle, Clock, FileText, Info, Search, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Resguardo, ResguardoStatus } from "@/services/api/inventario-computo/models/Resguardos"
import BaseModal from "@/components/common/base-modal"
import ResguardoDetails from "./ResguardoDetails"

interface HistorialResguardosProps {
  resguardos: Resguardo[]
}

export function HistorialResguardos({ resguardos }: HistorialResguardosProps) {


  const completados = resguardos.filter((r) => r.estatus === ResguardoStatus.Completado)
  const archivados = resguardos.filter((r) => r.estatus === ResguardoStatus.Archivado)


  return (
    <div className="w-full space-y-4">
        <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{resguardos.length > 0 ? resguardos[0].empleado : ""}</h1>
        </div>
      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="todos">Todos ({resguardos.length})</TabsTrigger>
          <TabsTrigger value="completados">Completados ({completados.length})</TabsTrigger>
          <TabsTrigger value="archivados">Archivados ({archivados.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-4 space-y-4">
          {resguardos.map((resguardo) => (
            <ResguardoCard key={resguardo.id} resguardo={resguardo} />
          ))}
          {resguardos.length === 0 && <EmptyState message="No se encontraron resguardos" />}
        </TabsContent>

        <TabsContent value="completados" className="mt-4 space-y-4">
          {completados.map((resguardo) => (
            <ResguardoCard key={resguardo.id} resguardo={resguardo} />
          ))}
          {completados.length === 0 && <EmptyState message="No hay resguardos completados" />}
        </TabsContent>

        <TabsContent value="archivados" className="mt-4 space-y-4">
          {archivados.map((resguardo) => (
            <ResguardoCard key={resguardo.id} resguardo={resguardo} />
          ))}
          {archivados.length === 0 && <EmptyState message="No hay resguardos archivados" />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ResguardoCard({ resguardo }: { resguardo: Resguardo }) {
  const [openModal, setOpenModal] = useState(false)
  
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        resguardo.estatus === ResguardoStatus.Completado ? "border-l-4 border-l-green-500" : resguardo.estatus === ResguardoStatus.Archivado ? "border-l-4 border-l-gray-500" : "border-l-4 border-l-amber-500",
      )}
      onClick={handleOpenModal}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Resguardo #{resguardo.id}</CardTitle>
          <Badge
            variant={resguardo.estatus === ResguardoStatus.Completado ? "default" : "secondary"}
            className={cn(
              "rounded-md",
              resguardo.estatus === ResguardoStatus.Completado ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800",
              resguardo.estatus === ResguardoStatus.Archivado ? "bg-gray-100 text-gray-800" : ""
            )}
          >
            {resguardo.estatus === ResguardoStatus.Completado ? (
              <CheckCircle className="mr-1 h-3 w-3" />
            ) : resguardo.estatus === ResguardoStatus.Archivado ? (
              <Archive className="mr-1 h-3 w-3" />
            ) : (
              <Clock className="mr-1 h-3 w-3" />
            )}
            {resguardo.estatus}
          </Badge>
        </div>
        <CardDescription className="flex items-center text-sm">
          <User className="mr-1 h-3 w-3" />
          {resguardo.empleado} (ID: {resguardo.empleadoId})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-4 pt-0">
        <div className="text-sm">
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
            <p className="flex-1">{resguardo.notas}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Creado: {new Date(resguardo.created).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Modificado: {new Date(resguardo.modified).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </div>
          <div className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            Creado por: {resguardo.createdBy}
          </div>
          <div className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            Modificado por: {resguardo.modifiedBy}
          </div>
        </div>
      </CardContent>
      <div onClick={handleModalClick}>
        <BaseModal 
          open={openModal} 
          onClose={handleCloseModal} 
          className="max-w-7xl" 
          title={`Historial de resguardos`}
        >
          <ResguardoDetails resguardoId={resguardo.id} status={resguardo.estatus} />
        </BaseModal>
      </div>
    </Card>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Info className="h-10 w-10 text-muted-foreground/60" />
      <h3 className="mt-4 text-lg font-semibold">{message}</h3>
      <p className="mt-2 text-sm text-muted-foreground">Intenta cambiar los filtros de búsqueda</p>
    </div>
  )
}
