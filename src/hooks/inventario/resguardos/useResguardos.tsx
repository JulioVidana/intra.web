
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
import { pdf } from "@react-pdf/renderer"
import DocumentoResguardo from "@/reports/inventario-computo/documento-resguardo"
export function useResguardos() {

    const [openModal, setOpenModal] = useState(false)
    const [pagination, setPagination] = useState<Pagination>({ totalItems: 0, pageNumber: 0, pageSize: 10 })
    const [search, setSearch] = useState<string>('')
    const [resguardoId, setResguardoId] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)
    const debouncedSearch = useDebounce(search, 200);

    const { data,  error, isLoading: isLoadingResguardos } = useQuery<GetResguardosResponse, Error>({
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
        enabled: resguardoId !== undefined && resguardoId > 0,
    })

    const handlePrint = async (id:number) => {
        console.log('entre');
        try {
          setIsLoading(true);
          const data = await API.inventarioComputo.getResguardoDetalles(id);
          const blob = await pdf(
            <DocumentoResguardo resguardo={data.data} />
          ).toBlob();
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        } catch (error) {
          
        } finally {
          setIsLoading(false);
        }
      };

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

    const handleRefetchResguardoDetalles = async (id: number) => {
        setResguardoId(id);
        
    }

    return {
        pagination,
        setPagination,
        handleSearchChange,
        handlePageSizeChange,
        handlePageChange,
        isLoading,
        handlePrint,
        resguardosData,
        search,
        openModal,
        setOpenModal,
        totalItems,
        resguardoDetallesData,
        isLoadingResguardoDetalles,
        errorResguardoDetalles,
        refetchResguardoDetalles,
        handleRefetchResguardoDetalles
    }
}