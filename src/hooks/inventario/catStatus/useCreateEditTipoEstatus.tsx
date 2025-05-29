
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tipoEstatusSchema, TipoEstatusFormData } from "@/components/inventario/catalogos/tipoEstatus/schemas/tipoEstatusSchema";
import { getTipoEstatusDefaultValues } from "@/components/inventario/catalogos/tipoEstatus/schemas/tipoEstatusDefaultValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/services/api/API";
import { toast } from "sonner";
import { useState } from "react";
import { toastVariants } from "@/components/ui/sonner";

export function useCreateEditTipoEstatus(onSuccess?: () => void, initialValues?: Partial<TipoEstatusFormData>) {
  const isEdit = !!initialValues;
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const methods = useForm<TipoEstatusFormData>({
    resolver: zodResolver(tipoEstatusSchema),
    defaultValues: getTipoEstatusDefaultValues(initialValues),
  });

  const { mutate: saveTipoEstatus, isPending, error } = useMutation({
    mutationFn: (tipoEstatus: TipoEstatusFormData) =>
      isEdit ? API.inventarioComputo.putTipoEstatus(tipoEstatus) : API.inventarioComputo.postTipoEstatus(tipoEstatus),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Tipo de estatus guardado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El tipo de estatus se ha guardado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catStatus'] }); 
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El tipo de estatus no se ha guardado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El tipo de estatus no se ha guardado correctamente",
      });
    },
  });

  const onDelete = useMutation({
    mutationFn: (id: number) => API.inventarioComputo.deleteTipoEstatus(id),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Tipo de estatus eliminado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El tipo de estatus se ha eliminado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catStatus'] });
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El tipo de estatus no se ha eliminado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El tipo de estatus no se ha eliminado correctamente",
      });
    },
  });
  
  const { handleSubmit } = methods;

  const onSubmit = async (tipoEstatus: TipoEstatusFormData) => {
    saveTipoEstatus(tipoEstatus);
  };

  return {
    isPending,
    error,
    handleSubmit,
    methods,
    onSubmit,
    isEdit,
    onDelete,
    openModal,
    setOpenModal,
    openModalDelete,
    setOpenModalDelete,
  };
}