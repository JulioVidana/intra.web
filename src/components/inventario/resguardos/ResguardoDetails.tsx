"use client"

import { useResguardos } from "@/hooks/inventario/resguardos/useResguardos"
import { getEquiposColumns } from "../asignaciones/detalles/ListaEquiposTableColumns"
import { EquiposList } from "../asignaciones/detalles/EquiposList"
import { formatDate } from "@/utils/date"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  CalendarClock,
  ClipboardList,
  FileText,
  Pencil,
  User,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Clipboard,
  Users,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { FileUploader } from "@/components/common/file-uploader"
import { useCreateEditResguardos } from "@/hooks/inventario/resguardos/useCreateEditResguardos"
import { ResguardoStatus } from "@/services/api/inventario-computo/models/Resguardos"
export default function ResguardoDetails({ resguardoId, status, onClose }: { resguardoId: number, status?: string , onClose?: () => void}) {
  const { resguardoDetallesData, isLoadingResguardoDetalles, errorResguardoDetalles, refetchResguardoDetalles } = useResguardos(resguardoId)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const { handleUploadFile, actualizarResguardo } = useCreateEditResguardos();

 
  if (isLoadingResguardoDetalles) {
    return (
      <div role="status" className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  if (errorResguardoDetalles) {
    return (
      <Alert variant="destructive" className="my-6 border-2 border-red-200 bg-red-50 rounded-xl shadow-sm">
        <AlertCircle className="h-5 w-5" />
        <AlertDescription className="text-sm font-medium">
          Error al cargar los detalles del resguardo. Por favor, intente nuevamente.
        </AlertDescription>
      </Alert>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pendiente":
        return {
          className: "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200",
          icon: <AlertCircle className="h-3.5 w-3.5 mr-1" />,
        }
      case "Completado":
        return {
          className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200",
          icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1" />,
        }
      case "Entregado":
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />,
        }
      case "Desactualizado":
        return {
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />,
        }
      default:
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200",
          icon: <Info className="h-3.5 w-3.5 mr-1" />,
        }
    }
  }

  if(status){
    resguardoDetallesData.estatus = status as ResguardoStatus
  }

  const statusBadge = resguardoDetallesData?.estatus
    ? getStatusBadge(resguardoDetallesData.estatus)
    : { className: "", icon: null }

  return (
    <div className="space-y-6 p-0" onClick={(e) => e.stopPropagation()}>
     <div className="bg-gradient-to-r from-gray-50 to-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Section - Main Info */}
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-xl shadow-md flex-shrink-0">
            <Clipboard className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-primary">Resguardo #{resguardoId}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">
                Asignado a: <span className="font-semibold">{resguardoDetallesData?.empleado || "N/A"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Actions and Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
          {/* Date */}
          {resguardoDetallesData?.fecha && (
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm">
              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">
                {formatDate(resguardoDetallesData.fecha.toLocaleString("es-ES", { timeZone: "UTC" }))}
              </span>
            </div>
          )}

          {/* File Uploader */}
          <div className="w-full sm:w-auto">
            <FileUploader
              fileName={resguardoDetallesData?.nombreDoc}
              onUpload={(file: File) => handleUploadFile(resguardoDetallesData, file, refetchResguardoDetalles)}
              onError={() => {}}
              disabled={resguardoDetallesData?.estatus === ResguardoStatus.Archivado}
            />
          </div>

          {/* Status and Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Badge */}
            {resguardoDetallesData?.estatus && resguardoDetallesData.estatus !== ResguardoStatus.Desactualizado && (
              <Badge
                variant="outline"
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium whitespace-nowrap ${statusBadge.className}`}
              >
                {statusBadge.icon}
                <span>{resguardoDetallesData.estatus}</span>
              </Badge>
            )}

            {/* Update Button */}
            {resguardoDetallesData?.estatus === ResguardoStatus.Desactualizado && (
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 border-yellow-200 whitespace-nowrap"
                onClick={() => {
                  actualizarResguardo(resguardoDetallesData, {
                    onSuccess: async () => {
                      const result = await refetchResguardoDetalles()
                      if (result.data?.data?.estatus !== ResguardoStatus.Pendiente) {
                        onClose?.();
                      }
                    }
                  });
                }}
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>

      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 rounded-t-xl text-primary py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-primary font-bold">Equipos Asignados</CardTitle>
            </div>
            <Badge variant="outline" className="bg-white text-primary border-white/30 hover:bg-white/20">
              {resguardoDetallesData?.equipos?.length || 0} equipos
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {resguardoDetallesData?.equipos && resguardoDetallesData.equipos.length > 0 ? (
            <div className="rounded-b-xl overflow-hidden">
              <EquiposList
                equiposColumns={getEquiposColumns()}
                equipos={resguardoDetallesData.equipos}
                isLoading={isLoadingResguardoDetalles}
                pageKey={resguardoId.toString()}
                handlePageNextChange={() => {}}
                isFetchingNextPage={false}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50">
              <div className="bg-white p-4 rounded-full border border-gray-200 shadow-sm mb-4">
                <ClipboardList className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-gray-700 font-medium text-lg">No hay equipos asignados</p>
              <p className="text-gray-500 mt-2 max-w-md">
                Este resguardo no tiene equipos asociados actualmente. Los equipos asignados aparecerán en esta sección.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center mt-2">
        <Button
          variant="outline"
          onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
          className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/5"
        >
          {showAdditionalInfo ? "Ocultar detalles" : "Ver más detalles"}
          {showAdditionalInfo ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {showAdditionalInfo && (
        <div className="space-y-6 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-medium text-gray-700">Información de creación</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Fecha de creación</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(resguardoDetallesData?.fecha?.toString() || null)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Fecha de creación</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(resguardoDetallesData?.created?.toLocaleString('es-ES', { timeZone: 'UTC' }) || null)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Fecha de modificación</p>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(resguardoDetallesData?.modified?.toLocaleString('es-ES', { timeZone: 'UTC' }) || null)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium text-gray-700">Notas</CardTitle>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full hover:bg-gray-200">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{resguardoDetallesData?.notas ? "Editar notas" : "Agregar notas"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {resguardoDetallesData?.notas ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-inner">
                    <p className="text-sm whitespace-pre-line text-gray-700 leading-relaxed">
                      {resguardoDetallesData.notas}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <FileText className="h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-gray-600 font-medium">No hay notas disponibles</p>
                    <p className="text-gray-400 text-xs mt-1">Haga clic en el ícono de lápiz para agregar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 py-3 px-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium text-gray-700">Información de resguardo</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-medium text-gray-700">Creado por</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">{resguardoDetallesData?.createdBy || "N/A"}</p>
                  <p className="text-xs text-gray-500 pl-10 mt-1">
                    {formatDate(resguardoDetallesData?.created?.toLocaleString('es-ES', { timeZone: 'UTC' }) || null)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Pencil className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-medium text-gray-700">Modificado por</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">{resguardoDetallesData?.modifiedBy || "N/A"}</p>
                  <p className="text-xs text-gray-500 pl-10 mt-1">
                    {formatDate(resguardoDetallesData?.modified?.toLocaleString('es-ES', { timeZone: 'UTC' }) || null)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
