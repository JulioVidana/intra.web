"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import BaseModal from "@/components/common/base-modal"
import EquipoDetails from "../../equipos/EquipoDetails"
import type { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import { getStatusStyle } from "@/utils/status"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface EquipoCardProps {
  equipo: Equipos
  icon: React.ReactNode
  size?: "sm" | "lg"
  isNewlyAdded?: boolean
  onDelete?: (equipo: Equipos) => void
  isSelected?: boolean
  onSelect?: () => void
}

export default function EquipoCard({ 
  equipo, 
  icon, 
  size = "lg", 
  isNewlyAdded = false, 
  onDelete,
  isSelected = false,
  onSelect
}: EquipoCardProps) {
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const isSmall = size === "sm"

  const handleDeleteCard = (equipo: Equipos) => {
    onDelete?.(equipo)
    setOpenModalDelete(false)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    onSelect?.()
  }

  return (
    <div>
      <Card
        className={cn(
          isSmall && "border-[0.5px] max-w-[250px] max-h-[250px]",
          isNewlyAdded && "border-2 border-emerald-300/30 bg-emerald-40 shadow-[0_0_10px_rgba(110,231,183,0.2)]",
          isSelected && "border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.2)]",
          "relative cursor-pointer hover:bg-accent/50 transition-colors"
        )}
        onClick={handleCardClick}
      >
        {isSelected && (
          <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
          onClick={() => setOpenModalDelete(true)}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className={cn("pb-2", isSmall && "p-3")}>
          <div className="flex justify-between items-start gap-1">
            <div className="flex items-center gap-2">
              <div className={cn("bg-primary/10 rounded-full", isSmall ? "p-1.5" : "p-2")}>
                <span className={cn(isSmall && "scale-75 block")}>{icon}</span>
              </div>
              <CardTitle className={cn(isSmall ? "text-sm" : "text-base")}>
                {equipo.descripcion}
              </CardTitle>
            </div>
            <Badge className={cn(getStatusStyle(equipo.statusNombre), "m-2", isSmall && "text-xs px-1.5 py-0")}>
              {equipo.statusNombre}
            </Badge>
          </div>
          <CardDescription className={cn(isSmall && "text-xs mt-0.5")}>
            {equipo.tipoEquipoNombre}
          </CardDescription>
        </CardHeader>

        <CardContent className={cn(isSmall && "p-3 pt-0")}>
          {isSmall ? (
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-muted-foreground min-w-[80px]">Clave:</span>
                <span className="font-medium">{equipo.clave}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-muted-foreground min-w-[80px]">Número de serie:</span>
                <span className="font-medium">{equipo.numSerie}</span>
              </div>
              {equipo.fechaBaja && (
                <div className="flex flex-wrap items-center gap-x-2">
                  <span className="text-muted-foreground min-w-[80px]">Fecha de baja:</span>
                  <span className="font-medium">{equipo.fechaBaja}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-1 text-xs h-7"
                onClick={() => setOpenModal(true)}
              >
                Ver detalles
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clave:</span>
                <span className="font-medium">{equipo.clave}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número de serie:</span>
                <span className="font-medium">{equipo.numSerie}</span>
              </div>
              {equipo.fechaBaja && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha de baja:</span>
                  <span className="font-medium">{equipo.fechaBaja}</span>
                </div>
              )}
              <Button 
                variant="outline" 
                size="default" 
                className="w-full" 
                onClick={() => setOpenModal(true)}
              >
                Ver detalles
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <BaseModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        title="Detalles del equipo"
      >
        <EquipoDetails equipo={equipo} />
      </BaseModal>

      <BaseModal 
        open={openModalDelete} 
        onClose={() => setOpenModalDelete(false)} 
        title={`Desasignar equipo ${equipo.descripcion}`}
        description={`¿Estás seguro de querer desasignar el equipo con el número de serie ${equipo.numSerie}? Esta acción es irreversible.`} 
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModalDelete(false)}>Cancelar</Button>
            <Button onClick={() => handleDeleteCard(equipo)}>Eliminar</Button>
          </div>
        }
      >
      </BaseModal>
    </div>
  )
}
