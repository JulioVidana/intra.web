"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Cpu, Grid, List } from "lucide-react"
import EquipoCard from "@/components/inventario/asignaciones/detalles/EquiposCard"
import { EquiposList } from "@/components/inventario/asignaciones/detalles/EquiposList"
import type { Asignaciones } from "@/services/api/inventario-computo/models/Asignaciones"
import { Button } from "@/components/ui/button"
import BaseModal from "@/components/common/base-modal"
import { getEquiposColumns } from "./ListaEquiposTableColumns"
import { useAsignacionesDetalles } from "@/hooks/inventario/asignaciones/useAsignacionesDetalles"

export default function DetallesTabs({ asignacionesData, EmpleadoId }: { asignacionesData: Asignaciones, EmpleadoId: string })  {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { handleDeleteCard, handleEquipoSelection,openModal,setOpenModal,selectedEquiposDetalles,setSelectedEquiposDetalles } = useAsignacionesDetalles(EmpleadoId)

  const clearSelection = () => {
    setSelectedEquiposDetalles([])
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  return (
    <div>
      {selectedEquiposDetalles.length > 0 && (
        <div className="flex items-center justify-between gap-4 mb-4 p-2 bg-primary/5 rounded-lg">
          <span className="text-sm font-medium">
            {selectedEquiposDetalles.length} equipo{selectedEquiposDetalles.length !== 1 ? 's' : ''} seleccionado{selectedEquiposDetalles.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto justify-end"
              onClick={clearSelection}
            >
              Limpiar selección
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto justify-end"
              onClick={() => {
                setOpenModal(true)
              }}
            >
              Desasignar
            </Button>
            <Button
              variant="default"
              size="sm"
              className="ml-auto justify-end"
              onClick={clearSelection}
            >
              Reasignar
            </Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="0" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="0">Todos</TabsTrigger>
            {asignacionesData?.equiposAsignados
              .reduce(
                (unique, equipo) => {
                  const exists = unique.find((item) => item.tiposEquiposId === equipo.tiposEquiposId)
                  if (!exists) {
                    unique.push(equipo)
                  }
                  return unique
                },
                [] as typeof asignacionesData.equiposAsignados,
              )
              .map((equipo) => (
                <TabsTrigger key={equipo.id+equipo.clave} value={equipo.tiposEquiposId.toString()}>
                  {equipo.tipoEquipoNombre}
                </TabsTrigger>
              ))}
          </TabsList>

          <div className="flex items-center gap-2">
            <Grid className={`h-4 w-4 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`} />
            <Switch checked={viewMode === "list"} onCheckedChange={toggleViewMode} aria-label="Toggle view mode" />
            <List className={`h-4 w-4 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`} />
          </div>
        </div>

        <TabsContent value="0" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Todos los equipos asignados</h2>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {asignacionesData?.equiposAsignados.map((equipo) => (
                <EquipoCard 
                  key={equipo.id+equipo.clave} 
                  equipo={equipo} 
                  icon={<Cpu className="h-5 w-5" />}
                  onDelete={() => handleDeleteCard([equipo])}
                  isSelected={selectedEquiposDetalles.some(e => e.id + e.clave === equipo.id + equipo.clave)}
                  onSelect={() => handleEquipoSelection(equipo)}
                />
              ))}
            </div>
          ) : (
            <EquiposList 
              
              equipos={asignacionesData?.equiposAsignados} 
              equiposColumns={getEquiposColumns(handleEquipoSelection)} 
              isLoading={false} 
              pageKey={null} 
              handlePageNextChange={()=>{}} 
              isFetchingNextPage={false}
              Selected={selectedEquiposDetalles}
              onSelect={handleEquipoSelection}
            />
          )}
        </TabsContent>

        {asignacionesData?.equiposAsignados
          .reduce(
            (unique, equipo) => {
              const exists = unique.find((item) => item.tiposEquiposId === equipo.tiposEquiposId)
              if (!exists) {
                unique.push(equipo)
              }
              return unique
            },
            [] as typeof asignacionesData.equiposAsignados,
          )
          .map((tipoEquipo) => (
            <TabsContent
              key={tipoEquipo.id+tipoEquipo.clave}
              value={tipoEquipo.tiposEquiposId.toString()}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold mb-4">{tipoEquipo.tipoEquipoNombre}</h2>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {asignacionesData?.equiposAsignados
                    .filter((equipo) => equipo.tiposEquiposId === tipoEquipo.tiposEquiposId)
                    .map((equipo) => (
                      <EquipoCard 
                        key={equipo.id+equipo.clave} 
                        equipo={equipo} 
                        icon={<Cpu className="h-5 w-5" />}
                        onDelete={() => handleDeleteCard([equipo])}
                        isSelected={selectedEquiposDetalles.some(e => e.id + e.clave === equipo.id + equipo.clave)}
                        onSelect={() => handleEquipoSelection(equipo)}
                      />
                    ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <EquiposList 
                    key={asignacionesData?.equiposAsignados.length}
                    equipos={asignacionesData?.equiposAsignados.filter(
                      (equipo) => equipo.tiposEquiposId === tipoEquipo.tiposEquiposId
                    )} 
                    equiposColumns={getEquiposColumns(handleEquipoSelection)} 
                    isLoading={false} 
                    pageKey={null} 
                    handlePageNextChange={()=>{}} 
                    isFetchingNextPage={false}
                    Selected={selectedEquiposDetalles}
                    onSelect={handleEquipoSelection}
                  />
                </div>
              )}
            </TabsContent>
          ))}
      </Tabs>
      <BaseModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        title={`Esta apunto de desasignar los equipos seleccionados ${selectedEquiposDetalles.map(e => e.clave).join(", ")}`}
        description={`¿Estás seguro de querer desasignar los equipos seleccionados? Esta acción es irreversible.`} 
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button onClick={() => handleDeleteCard(selectedEquiposDetalles)}>Eliminar</Button>
          </div>
        }
      >
      </BaseModal>

    </div>
  )
}
