"use client"

import type React from "react"

import { Computer, Info, MapPin, FileText, Key, Hash, Server, AlertTriangle, User } from "lucide-react"
import type { Equipos } from "../../../services/api/inventario-computo/models/Equipos"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { getStatusStyle } from "@/utils/status" 
import { formatDate } from "@/utils/date"


interface EquipoDetailsProps {
  equipo: Equipos
}

export default function EquipoDetails({ equipo }: EquipoDetailsProps) {

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1 py-2">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{equipo.descripcion}</h2>
          <div className="flex items-center gap-2">
          <Badge className={cn(getStatusStyle(equipo.statusNombre), "text-sm px-3 py-1 font-medium")}>
            {equipo.statusNombre}
          </Badge>
          {equipo.isAsignado && (
            <Badge className="text-sm px-3 py-1 font-medium bg-orange-100 text-orange-800 hover:bg-orange-100">
              Asignado
            </Badge>
          )}
          {!equipo.isAsignado && (
            <Badge className="text-sm px-3 py-1 font-medium bg-gray-100 text-gray-800 hover:bg-gray-100">
              No Asignado
            </Badge>
          )}
          </div>
        </div>
        <p className="text-gray-500">Información detallada del equipo de cómputo</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-2 h-11">
          <TabsTrigger value="general" className="text-sm">
            Información General
          </TabsTrigger>
          <TabsTrigger value="technical" className="text-sm">
            Detalles Técnicos
          </TabsTrigger>
        </TabsList>
        <div className="overflow-y-auto max-h-[calc(56vh-10rem)] min-h-[calc(56vh-10rem)]">
          {/* General Information Tab */}
          <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                <InfoItem
                  icon={<Computer className="h-5 w-5 text-primary/70" />}
                  label="Tipo de Equipo"
                  value={equipo.tipoEquipoNombre}
                />

                {equipo.subEquipoNombre && (
                  <InfoItem
                    icon={<Server className="h-5 w-5 text-primary/70" />}
                    label="Sub Equipo"
                    value={equipo.subEquipoNombre}
                  />
                )}

                <InfoItem
                  icon={<FileText className="h-5 w-5 text-primary/70" />}
                  label="Descripción"
                  value={equipo.descripcion}
                />
                {equipo.isAsignado && equipo.empleadoAsignado && (
                  <InfoItem
                    icon={<User className="h-5 w-5 text-primary/70" />}
                    label="Empleado Asignado"
                    value={equipo.empleadoAsignado}
                    description={equipo.departamentoEmpleadoAsignado}
                  />
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <InfoItem icon={<Key className="h-5 w-5 text-primary/70" />} label="Clave" value={equipo.clave} />

                <InfoItem
                  icon={<Key className="h-5 w-5 text-primary/70" />}
                  label="Clave SIIF"
                  value={equipo.claveSIIF}
                />

                <InfoItem
                  icon={<Hash className="h-5 w-5 text-primary/70" />}
                  label="Número de Serie"
                  value={equipo.numSerie}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="bg-slate-50 p-4 rounded-lg">
              <InfoItem
                icon={<MapPin className="h-5 w-5 text-primary/70" />}
                label="Ubicación"
                value={equipo.ubicacion}
                fullWidth
              />
            </div>
          </TabsContent>

          {/* Technical Details Tab */}
          <TabsContent value="technical" className="space-y-6 animate-in fade-in-50 duration-300">
            <div className="bg-slate-50 p-5 rounded-lg">
              <InfoItem
                icon={<Server className="h-5 w-5 text-primary/70" />}
                label="Características Técnicas"
                value={equipo.caracteristicas}
                fullWidth
                multiline
              />
            </div>

            <div className="bg-slate-50 p-5 rounded-lg">
              <InfoItem
                icon={<Info className="h-5 w-5 text-primary/70" />}
                label="Observaciones"
                value={equipo.observaciones || "Sin observaciones"}
                fullWidth
                multiline
              />
            </div>

            {equipo.fechaBaja && (
              <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                <InfoItem
                  icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                  label="Fecha de Baja"
                  value={formatDate(equipo.fechaBaja, "longDate")}
                  valueClassName="text-red-600 font-medium"
                  fullWidth
                />
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  description?: string
  fullWidth?: boolean
  multiline?: boolean
  valueClassName?: string
}

function InfoItem({ icon, label, value,description, fullWidth = false, multiline = false, valueClassName = "" }: InfoItemProps) {
  return (
    <div className={cn("flex items-start gap-3", fullWidth && "w-full")}>
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
        <p className={cn("text-base font-medium", multiline && "whitespace-pre-line", valueClassName)}>{value}</p>
        {description && <p className="text-xs text-gray-500">{`Departamento: ${description}`}</p>}
      </div>
    </div>
  )
}
