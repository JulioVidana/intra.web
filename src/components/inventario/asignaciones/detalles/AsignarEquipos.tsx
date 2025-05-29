"use client"

import { useState } from "react"
import BaseModal from "@/components/common/base-modal"
import { Button } from "@/components/ui/button"
import { useEquipos } from "@/hooks/inventario/equipos/useEquipos"
import { Info } from "lucide-react"
import EquipoDetails from "../../equipos/EquipoDetails"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { EquiposList } from "./EquiposList"
import { getEquiposColumns } from "./ListaEquiposTableColumns"
import { Combobox } from "@/components/ui/combobox"
import { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import { useAsignacionesDetalles } from "@/hooks/inventario/asignaciones/useAsignacionesDetalles"

export default function AsignarEquipos({asignarEquipos,EmpleadoId}:{asignarEquipos: (equipos: Equipos[]) => void,EmpleadoId: string}) {
  const { equiposData,handleSearchChange: handleEquiposSearchChange } = useEquipos(false)
  const { selectedEquipos, handleEquipoSelect, selectedEquiposData, setSelectedEquiposData, selectedEquipo, setSelectedEquipos, openModal, setOpenModal } = useAsignacionesDetalles(EmpleadoId)
  
  const options = equiposData.map((equipo) => ({
    id: equipo.id.toString(),
    label: `${equipo.clave} - ${equipo.descripcion}`,
    value: equipo.id.toString(),
  }))

  const handleInputChange = (inputValue: string) => {
    handleEquiposSearchChange(inputValue)
  }

  const cleanSelectedEquipos = () => {
    setSelectedEquipos([]),
    setSelectedEquiposData([])
  }
  

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-sm border">
        {/* MultiSelect with better styling */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Buscar y seleccionar equipos:</label>
          <Combobox
            options={options}
            selected={selectedEquipos[selectedEquipos.length - 1] || ""}
            onChange={(value) => handleEquipoSelect(value, equiposData)}
            optionLabel="equipos"
            className="w-full"
            onInputChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">{selectedEquipos.length} equipo(s) seleccionado(s)</p>
        </div>

        {/* Selected equipment cards - Completely redesigned */}
        <div className="flex items-center justify-end mb-5">
          {selectedEquipos.length > 0 && (
            <Button variant="outline" size="sm" onClick={cleanSelectedEquipos}>
              Limpiar selección
            </Button>
          )}
        </div>

        <Separator className="mb-6" />

        {selectedEquipos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-muted/30 p-3 rounded-full mb-3">
              <Info className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="text-base font-medium mb-1">No hay equipos seleccionados</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              Utilice el buscador para encontrar y seleccionar los equipos que desea asignar.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[400px]">
            <EquiposList
              isSmall={true}
              equipos={selectedEquiposData}
              equiposColumns={getEquiposColumns()}
              isLoading={false}
              pageKey={'selectedEquipos'}
              handlePageNextChange={() => {}}
              isFetchingNextPage={false}
            />
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancelar
          </Button>
          <Button variant="default" onClick={() => asignarEquipos(selectedEquiposData)} size="sm">
            Asignar equipos
          </Button>
        </div>
      </div>

      {/* Modal for equipment details */}
      <BaseModal open={openModal} onClose={() => setOpenModal(false)} title="Detalles del equipo">
        <ScrollArea className="max-h-[80vh]">{selectedEquipo && <EquipoDetails equipo={selectedEquipo} />}</ScrollArea>
      </BaseModal>
    </div>
  )
}
