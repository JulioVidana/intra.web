
"use client"

import { useState } from "react"
import { API } from "@/services/api/API"
import { Pagination } from "@/services/api/core/schema/BaseResponse"
import { toast } from "sonner"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/common/useDebounce" 
import { GetTipoEquiposResponse } from "@/services/api/inventario-computo/schemas/GetTipoEquiposResponse"
import { TipoEquipos } from "@/services/api/inventario-computo/models/TipoEquipos"
export function useTipoEquipos() {

  const [openModal, setOpenModal] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({ totalItems: 0, pageNumber: 0, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 200); 

  const { data, isLoading, error } = useQuery<GetTipoEquiposResponse, Error>({
    queryKey: ["catTipoEquipos", pagination.pageNumber, pagination.pageSize, debouncedSearch],
    queryFn: () => API.inventarioComputo.getTipoEquipos(
      pagination.pageNumber + 1,
      pagination.pageSize,
      debouncedSearch 
    ),
    placeholderData: keepPreviousData,
  })
      
  const tipoEquiposData =  data?.data || [] as TipoEquipos[]
  const totalItems = data?.pagination.totalItems || 0

  if (error) toast.error(error.message)

  
  const handleSearchChange = (search: string) => {
    const cleanValue = search.replace(/[^a-zA-Z0-9 ]/g, "")
    setSearch(cleanValue)
    setPagination({ ...pagination, pageNumber: 0 }); 
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
    totalItems,
    handleSearchChange,
    handlePageSizeChange,
    handlePageChange,
    isLoading,
    tipoEquiposData,
    search,
    openModal,
    setOpenModal
  }
}