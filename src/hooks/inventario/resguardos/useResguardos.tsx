
"use client"

import { useState } from "react"
import { API } from "@/services/api/API"
import { Pagination } from "@/services/api/core/schema/BaseResponse"
import { toast } from "sonner"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/common/useDebounce"
import { Resguardo } from "@/services/api/inventario-computo/models/Resguardos"
import { GetResguardosResponse } from "@/services/api/inventario-computo/schemas/GetResguardosResponse"
import { GetResguardoByIdResponse } from "@/services/api/inventario-computo/schemas/GetResguardosByIdResponse"
export function useResguardos(resguardoId?: number) {

    const [openModal, setOpenModal] = useState(false)
    const [pagination, setPagination] = useState<Pagination>({ totalItems: 0, pageNumber: 0, pageSize: 10 })
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce(search, 200);

    const { data, isLoading, error } = useQuery<GetResguardosResponse, Error>({
        queryKey: ["catResguardos", pagination.pageNumber, pagination.pageSize, debouncedSearch],
        queryFn: () => API.inventarioComputo.getResguardos(
            pagination.pageNumber + 1,
            pagination.pageSize,
            debouncedSearch
        ),
        placeholderData: keepPreviousData,
    })

    const { data: resguardoDetalles, isLoading: isLoadingResguardoDetalles, error: errorResguardoDetalles, refetch: refetchResguardoDetalles } = useQuery<GetResguardoByIdResponse, Error>({
        queryKey: ["catResguardoDetalles", resguardoId],
        queryFn: () => API.inventarioComputo.getResguardoDetalles(resguardoId ?? 0),
        enabled: !!resguardoId,
    })

    const resguardosData = data?.data || [] as Resguardo[]
    const resguardoDetallesData = resguardoDetalles?.data || {} as Resguardo
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
        handleSearchChange,
        handlePageSizeChange,
        handlePageChange,
        isLoading,
        resguardosData,
        search,
        openModal,
        setOpenModal,
        totalItems,
        resguardoDetallesData,
        isLoadingResguardoDetalles,
        errorResguardoDetalles,
        refetchResguardoDetalles
    }
}