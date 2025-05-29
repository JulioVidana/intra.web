
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipoSchema, EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";
import { getEquipoDefaultValues } from "@/components/inventario/equipos/schemas/equiposDefaultValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/services/api/API";
import { toast } from "sonner";
import { TipoEquipoFormData } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";
import { tipoEquipoSchema } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";
import { getTipoEquipoDefaultValues } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoDefaultValues";
import { useState } from "react";
import { toastVariants } from "@/components/ui/sonner";
export function useCreateEditTipoEquipos(onSuccess?: () => void, initialValues?: Partial<TipoEquipoFormData>) {
  const isEdit = !!initialValues;
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const methods = useForm<TipoEquipoFormData>({
    resolver: zodResolver(tipoEquipoSchema),
    defaultValues: getTipoEquipoDefaultValues(initialValues),
  });

  const { mutate: saveTipoEquipo, isPending, error } = useMutation({
    mutationFn: (tipoEquipo: TipoEquipoFormData) =>
      isEdit ? API.inventarioComputo.putTipoEquipos(tipoEquipo) : API.inventarioComputo.postTipoEquipos(tipoEquipo),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Tipo de equipo guardado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El tipo de equipo se ha guardado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catTipoEquipos'] }); 
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El tipo de equipo no se ha guardado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El tipo de equipo no se ha guardado correctamente",
      });
    },
  });

  const onDelete = useMutation({
    mutationFn: (id: number) => API.inventarioComputo.deleteTipoEquipos(id),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Tipo de equipo eliminado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El tipo de equipo se ha eliminado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['catTipoEquipos'] });
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El tipo de equipo no se ha eliminado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El tipo de equipo no se ha eliminado correctamente",
      });
    },
  });
  
  const { handleSubmit } = methods;

  const onSubmit = async (tipoEquipo: TipoEquipoFormData) => {
    saveTipoEquipo(tipoEquipo);
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