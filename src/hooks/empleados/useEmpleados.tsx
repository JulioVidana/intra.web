
"use client"

import { useState } from "react"
import { API } from "@/services/api/API"
import { Pagination } from "@/services/api/core/schema/BaseResponse"
import { toast } from "sonner"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/common/useDebounce" 
import { GetEmpleadosResponse } from "@/services/api/empleados/schemas/GetEmpleadosResponse"
import { Empleado } from "@/services/api/empleados/models/Empleados"

export function useEmpleados() {

  const [openModal, setOpenModal] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({ totalItems: 0, pageNumber: 0, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 200); 

  const { data, isLoading, error } = useQuery<Empleado[], Error>({
    queryKey: ["catEmpleados", pagination.pageNumber, pagination.pageSize, debouncedSearch],
    queryFn: () => API.empleados.getEmpleados(
      pagination.pageNumber + 1,
      pagination.pageSize,
      debouncedSearch 
    ),
    placeholderData: keepPreviousData,
  })
      
  const empleadosData =  data || [] as Empleado[]

  const empleadoDataSelect = data?.map((empleado) => ({
    subDescripcion: empleado.departamentoName,
    descripcion: empleado.nombreCompleto,
    id: empleado.id
  }))   

  if (error) toast.error(error.message)

  
  const handleSearchChange = (search: string) => {
    const cleanValue = search.replace(/[^a-zA-Z0-9 ]/g, "")
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ ...pagination, pageSize, pageNumber: 0 })
  }

  const handlePageChange = (pageNumber: number) => {
    setPagination({ ...pagination, pageNumber })
  }
  
  return {
    pagination,
    setPagination,
    handleSearchChange,
    handlePageSizeChange,
    handlePageChange,
    isLoading,
    empleadosData,
    search,
    openModal,
    setOpenModal,
    empleadoDataSelect
  }
}