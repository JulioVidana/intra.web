import BaseModal from "@/components/common/base-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Printer, RefreshCcw, History, Loader2 } from "lucide-react";
import { Resguardo } from "@/services/api/inventario-computo/models/Resguardos";
import { useCreateEditResguardos } from "@/hooks/inventario/resguardos/useCreateEditResguardos";
import { HistorialResguardos } from "./ResguardoHistorial";
import { useResguardosHistorial } from "@/hooks/inventario/resguardos/useResguardoHistorial";
import { pdf } from "@react-pdf/renderer";
import DocumentoResguardo from "@/reports/inventario-computo/documento-resguardo";
import { useResguardos } from "@/hooks/inventario/resguardos/useResguardos";
import { useState } from "react";
import { API } from "@/services/api/API";

export default function ListaResguardosAcciones({ resguardo }: { resguardo: Resguardo }) {
  const [isLoading, setIsLoading] = useState(false);
  const { actualizarResguardo } = useCreateEditResguardos();

  const { handleRefetchResguardoDetalles, resguardoDetallesData, handlePrint } = useResguardos();

  const { 
    data: resguardoHistorial, 
    isLoading: isLoadingResguardoHistorial, 
    openModalHistorial, 
    setOpenModalHistorial,
    refetch 
  } = useResguardosHistorial(resguardo.empleadoId);

 
  const handleOpenModal = async () => {
    setOpenModalHistorial(true);
    await refetch(); 
  };


  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handlePrint(resguardo.id)} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Printer className="mr-2 h-4 w-4" />
            )}
            Imprimir
          </DropdownMenuItem>
          {resguardo.estatus === "Desactualizado" && (
            <DropdownMenuItem onClick={() => actualizarResguardo(resguardo)}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Actualizar
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleOpenModal}>
            <History className="mr-2 h-4 w-4" />
            Ver Historial
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Ver Detalles
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BaseModal open={openModalHistorial} onClose={() => setOpenModalHistorial(false)} title={`Historial de resguardos`}>
        {isLoadingResguardoHistorial ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <HistorialResguardos resguardos={resguardoHistorial?.data || []} />
        )}
      </BaseModal>
    </>
  );
}
