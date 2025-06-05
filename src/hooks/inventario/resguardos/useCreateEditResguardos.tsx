import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/services/api/API";
import { toast } from "sonner";
import { toastVariants } from "@/components/ui/sonner";
import { useState } from "react";
import { Resguardo, ResguardoStatus } from "@/services/api/inventario-computo/models/Resguardos";
import { SearchItem } from "@/components/ui/sarch-dialog";
import { useAuthStore } from "@/store/authStore";
export function useCreateEditResguardos(onSuccess?: () => void, isEdit?: boolean) {
    const userId = useAuthStore((state) => state.user?.Id ?? '0')
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [resguardoSelected, setResguardoSelected] = useState<Resguardo>();



  const { mutate: saveResguardo, isPending, error } = useMutation({
    mutationFn: (resguardo: SearchItem) => API.inventarioComputo.postResguardos(resguardo,userId),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Resguardo guardado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El resguardo se ha guardado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catResguardos'] }); 
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El resguardo no se ha guardado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El resguardo no se ha guardado correctamente",
      });
    },
  });
  

  const onDelete = useMutation({
    mutationFn: (id: number) => API.inventarioComputo.deleteResguardos(id),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Resguardo eliminado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El resguardo se ha eliminado correctamente",
        });
        setOpenModalDelete(false);
        queryClient.invalidateQueries({ queryKey: ['catResguardos'] });
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El resguardo no se ha eliminado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El resguardo no se ha eliminado correctamente",
      });
    },
  });

  const { mutate:actualizarResguardo, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: (resguardo: Resguardo) => API.inventarioComputo.putActualizarResguardo(resguardo),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Resguardo actualizado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El resguardo se ha actualizado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catResguardos'] });
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El resguardo no se ha actualizado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El resguardo no se ha actualizado correctamente",
      });
    },
  });

  const { mutateAsync: modificarResguardo, isPending: isModificandoResguardo, error: errorModificarResguardo } = useMutation({
    mutationFn: (resguardo: Resguardo) => API.inventarioComputo.putResguardos(resguardo),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Resguardo actualizado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El resguardo se ha actualizado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catResguardos'] });
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El resguardo no se ha actualizado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El resguardo no se ha actualizado correctamente",
      });
    },
  });
  
  const handleUploadFile = async (resguardo: Resguardo, file: File, refetchCallback: () => void) => {
    try {
      await modificarResguardo({
        ...resguardo,
        estatus: ResguardoStatus.Completado,
        fecha: new Date(),
        nombreDoc: file.name
      });
      refetchCallback();
    } catch (error) {
      toast.error("Error al subir el archivo:", {
        className: toastVariants({ variant: "error" }),
        description: "El archivo no se ha subido correctamente",
      });
    }
  };
  
  const handleDeleteFile = async (resguardo: Resguardo, refetchCallback: () => void) => {
    try {
      await modificarResguardo({
        ...resguardo,
        estatus: ResguardoStatus.Pendiente,
        nombreDoc: undefined
      });
      refetchCallback();
    } catch (error) {
      toast.error("Error al eliminar el archivo:", {
        className: toastVariants({ variant: "error" }),
        description: "El archivo no se ha eliminado correctamente",
      });
    }
  };
  
  
  const handleSubirResguardo = (resguardo: Resguardo) => {
    modificarResguardo(resguardo)
  };

  const onRowClick = (resguardo: Resguardo) => {
    setOpenModalDetails(true);
    setResguardoSelected(resguardo);
  };

  const onSubmit = async (resguardo: SearchItem ) => {
    saveResguardo(resguardo);
  };
  
  return {
    isPending,
    error,
    onSubmit,
    isEdit,
    onDelete,
    openModal,
    setOpenModal,
    openModalDelete,
    setOpenModalDelete,
    openModalDetails,
    setOpenModalDetails,
    onRowClick,
    resguardoSelected,
    actualizarResguardo,
    isUpdating,
    updateError,
    modificarResguardo,
    isModificandoResguardo,
    errorModificarResguardo,
    handleSubirResguardo,
    handleUploadFile,
    handleDeleteFile
  };
}