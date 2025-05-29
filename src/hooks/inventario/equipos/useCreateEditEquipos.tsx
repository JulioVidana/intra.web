
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipoSchema, EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";
import { getEquipoDefaultValues } from "@/components/inventario/equipos/schemas/equiposDefaultValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/services/api/API";
import { toast } from "sonner";
import { toastVariants } from "@/components/ui/sonner";
import { useState } from "react";

export function useCreateEditEquipos(onSuccess?: () => void, initialValues?: Partial<EquipoFormData>) {
  const isEdit = !!initialValues;
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  
  

  const methods = useForm<EquipoFormData>({
    resolver: zodResolver(equipoSchema),
    defaultValues: getEquipoDefaultValues(initialValues),
  });

  const { mutate: saveEquipo, isPending, error } = useMutation({
    mutationFn: (equipo: EquipoFormData) =>
      isEdit ? API.inventarioComputo.putEquipos(equipo) : API.inventarioComputo.postEquipos(equipo),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Equipo guardado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El equipo se ha guardado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['equipos'] }); 
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El equipo no se ha guardado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El equipo no se ha guardado correctamente",
      });
    },
  });

  const onDelete = useMutation({
    mutationFn: (id: number) => API.inventarioComputo.deleteEquipos(id),
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Equipo eliminado con éxito", {
          className: toastVariants({ variant: "success" }),
          description: "El equipo se ha eliminado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ['equipos'] });
        onSuccess?.();
      } else {
        toast.error(data.message, {
          className: toastVariants({ variant: "error" }),
          description: "El equipo no se ha eliminado correctamente",
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        className: toastVariants({ variant: "error" }),
        description: "El equipo no se ha eliminado correctamente",
      });
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (equipo: EquipoFormData) => {
    saveEquipo(equipo);
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