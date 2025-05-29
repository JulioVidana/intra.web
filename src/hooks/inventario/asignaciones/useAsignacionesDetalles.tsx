
"use client"

import { useState } from "react"
import { API } from "@/services/api/API"
import { toast } from "sonner"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetAsignacionByEmpleadoIdResponse } from "@/services/api/inventario-computo/schemas/GetAsignacionByEmpleadoIdResponse"
import { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import { toastVariants } from "@/components/ui/sonner"
import { AsigancionesPostDeleteRequest } from "@/services/api/inventario-computo/models/AsigancionesPostDeleteRequest"
interface EquiposAsignacion extends Equipos {
  agregar: boolean
  eliminar: boolean
}

export function useAsignacionesDetalles(EmpleadoId: string) {

  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false) 
  const [equiposAsignacion, setEquiposAsignacion] = useState<EquiposAsignacion[]>([])
  const queryClient = useQueryClient();
  const [selectedEquipos, setSelectedEquipos] = useState<string[]>([])
  const [selectedEquiposDetalles, setSelectedEquiposDetalles] = useState<Equipos[]>([])
  const [selectedEquipo, setSelectedEquipo] = useState<any>(null)
  const [selectedEquiposData, setSelectedEquiposData] = useState<Equipos[]>([])




  const { data, isLoading, error } = useQuery<GetAsignacionByEmpleadoIdResponse, Error>({
    queryKey: ["catAsignacionesDetalles", EmpleadoId],
    queryFn: () => API.inventarioComputo.getAsignacionesDetalles(EmpleadoId),
    placeholderData: keepPreviousData,
  })
      
  const asignacionesData =  data?.data 

  const { mutate: addAsignacion } = useMutation({
    mutationFn: (equipo: AsigancionesPostDeleteRequest) => API.inventarioComputo.postAsignaciones(equipo),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Se agrego la relacion de equipo con el empleado", {
          className: toastVariants({ variant: "success" }),
          description: "La relacion se ha agregado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catAsignacionesDetalles', EmpleadoId] });
        setOpenModal(false)
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "La relacion no se ha agregado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "La relacion no se ha agregado correctamente",
      });
    },
  });

  const agregarAsignacion = (item: Equipos[]) => {
    const data: AsigancionesPostDeleteRequest = {
      idEmpleado: parseInt(EmpleadoId),
      idsEquipos: item.map(equipo => equipo.id)
    }
    addAsignacion(data)
  }

  const { mutate: deleteAsignacion } = useMutation({
    mutationFn: (equipo: AsigancionesPostDeleteRequest) => API.inventarioComputo.deleteAsignaciones(equipo),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Se elimino la relacion de equipo con el empleado", {
          className: toastVariants({ variant: "success" }),
          description: "La relacion se ha eliminado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catAsignacionesDetalles', EmpleadoId] });
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "La relacion no se ha eliminado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "La relacion no se ha eliminado correctamente",
      });
    },
  });

  const  removeAsignacion = (item: Equipos[]) => {
    const data: AsigancionesPostDeleteRequest = {
      idEmpleado: parseInt(EmpleadoId),
      idsEquipos: item.map(equipo => equipo.id)
    }
    deleteAsignacion(data)
  }

  const handleEquipoSelect = (value: string, equiposData: Equipos[]) => {
    if (!selectedEquipos.includes(value)) {
      setSelectedEquipos([...selectedEquipos, value])
      setSelectedEquiposData([...selectedEquiposData, equiposData.find((equipo) => equipo.id.toString() === value) as Equipos])
    }
  }

  const handleDeleteCard = (equipos: Equipos[]) => {
    removeAsignacion(equipos)
    setSelectedEquipos([])
    setOpenModalDelete(false)
  }

  const handleEquipoSelection = (equipos: Equipos | Equipos[]) => {
    if (Array.isArray(equipos)) {
      setSelectedEquiposDetalles(equipos)
    } else {
      setSelectedEquiposDetalles(prev => {
        const exists = prev.some(e => e.id + e.clave === equipos.id + equipos.clave)
        if (exists) {
          return prev.filter(e => e.id + e.clave !== equipos.id + equipos.clave)
        } else {
          return [...prev, equipos]
        }
      })
    }
  }
  

  if (error) toast.error(error.message)

  return {
    isLoading,
    asignacionesData,
    openModal,
    setOpenModal,
    equiposAsignacion,
    agregarAsignacion,
    removeAsignacion,
    openModalDelete,
    setOpenModalDelete,
    handleEquipoSelect,
    selectedEquipos,
    selectedEquiposData,
    selectedEquipo,
    setSelectedEquipos,
    setSelectedEquiposData,
    setSelectedEquipo,
    handleEquipoSelection,
    handleDeleteCard,
    selectedEquiposDetalles,
    setSelectedEquiposDetalles
  }
}