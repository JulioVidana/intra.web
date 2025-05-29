import { TipoEstatus } from "@/services/api/inventario-computo/models/TipoEstatus"
import { useState } from "react"


export function useCreateEditTipoEstatus() {
  const [status, setStatus] = useState<TipoEstatus[]>([])


  const addItem = (formData: Partial<TipoEstatus>) => {
    const newItem: TipoEstatus = {
      id: Math.max(0, ...status.map((item) => item.id)) + 1,
      nombre: formData.nombre || "",
    }

    setStatus([...status, newItem])
    return newItem
  }


  const editItem = (id: number, formData: Partial<TipoEstatus>) => {
    const updatedstatus = status.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          nombre: formData.nombre || item.nombre,
        }
      }
      return item
    })

    setStatus(updatedstatus)
    return updatedstatus.find((item) => item.id === id)
  }


  return {
    status,
    addItem,
    editItem,
  }
}