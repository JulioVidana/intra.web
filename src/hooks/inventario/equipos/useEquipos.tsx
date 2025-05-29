
"use client"

import React, { useState, useEffect, useCallback } from "react"
import { API } from "@/services/api/API"
import type { Equipos } from "@/services/api/inventario-computo/models/Equipos"
import { Pagination } from "@/services/api/core/schema/BaseResponse"
import { toast } from "sonner"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/common/useDebounce" 
import { GetEquiposResponse } from "@/services/api/inventario-computo/schemas/GetEquiposResponse"

export function useEquipos(asignados?: boolean) {

  const [pagination, setPagination] = useState<Pagination>({ totalItems: 0, pageNumber: 0, pageSize: 10 })
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 200); 

  const { data, isLoading, error, refetch } = useQuery<GetEquiposResponse, Error>({
    queryKey: ["equipos", { pageNumber: pagination.pageNumber, pageSize: pagination.pageSize }, debouncedSearch],
    queryFn: () => API.inventarioComputo.getEquipos(
      pagination.pageNumber + 1,
      pagination.pageSize,
      debouncedSearch,
      asignados
    ),
    placeholderData: keepPreviousData,
  })
      
  const equiposData =  data?.data || [] as Equipos[]
  const totalItems = data?.pagination.totalItems || 0

  if (error) toast.error(error.message)

  
    const handleSearchChange = useCallback((search: string) => {
      const cleanValue = search.replace(/[^a-zA-Z0-9 ]/g, "")
      setSearch(cleanValue)
    }, [])
    

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
    equiposData,
    search
  }
}