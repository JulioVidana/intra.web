"use client"

import { useQuery } from "@tanstack/react-query"

import { API } from "@/services/api/API"
import { keepPreviousData } from "@tanstack/react-query"
import { GetResguardosResponse } from "@/services/api/inventario-computo/schemas/GetResguardosResponse"
import { useState } from "react";
export function useResguardosHistorial(EmpleadoId?: number) {

    const [openModalHistorial, setOpenModalHistorial] = useState(false);
    
    const { data, isLoading, error, refetch } = useQuery<GetResguardosResponse, Error>({
        queryKey: ["catResguardos", EmpleadoId],
        queryFn: () => API.inventarioComputo.getResguardoHistorial(
            EmpleadoId ?? 0
        ),
        enabled: false, 
        placeholderData: keepPreviousData,
    })  
 
    return {
        data,
        isLoading,
        error,
        openModalHistorial,
        setOpenModalHistorial,
        refetch 
    }
}