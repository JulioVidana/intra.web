import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipoSchema, EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";
import { getEquipoDefaultValues } from "@/components/inventario/equipos/schemas/equiposDefaultValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/services/api/API";
import { toast } from "sonner";
import { toastVariants } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Equipos } from "@/services/api/inventario-computo/models/Equipos";
import { useTipoEquipos } from "../catInventario/useTipoEquipos";
import { useStatusEquipos } from "../catStatus/useStatusEquipos";

export function useCreateEditEquipos(onSuccess?: () => void, initialValues?: Partial<EquipoFormData>) {
  
    const { tipoEquiposData } = useTipoEquipos();
    const { statusEquiposData } = useStatusEquipos();

  const isEdit = !!initialValues;
  const tieneValoresIniciales = !!initialValues;
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [equipoDetails, setEquipoDetails] = useState<Equipos | null>(null);

  const methods = useForm<EquipoFormData>({
    resolver: zodResolver(equipoSchema),
    defaultValues: getEquipoDefaultValues(initialValues),
  });

  const { setValue, control } = methods;
  
  const tipoEquipoSeleccionado = useWatch({
    control,
    name: 'tiposEquiposId',
  });

  useEffect(() => {
    if (tieneValoresIniciales) return;
    const tipoSeleccionado = tipoEquiposOptions.find(
      (tipo) => tipo.value === tipoEquipoSeleccionado
    );
    if (tipoSeleccionado?.clave) {
      setValue('clave', tipoSeleccionado.clave);
    }
  }, [tipoEquipoSeleccionado]);

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
        setOpenModalDelete(false);
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

  const onRowClick = (equipo: Equipos) => {
    setEquipoDetails(equipo);
    setOpenModalDetails(true);
  };

  const { handleSubmit } = methods;

  const onSubmit = async (equipo: EquipoFormData) => {
    if (equipo.statusId === '2') {
      equipo.fechaBaja = undefined;
    }
    saveEquipo(equipo);
  };
  
  const tipoEquiposOptions = tipoEquiposData.map((tipoEquipo) => ({
    value: tipoEquipo.id.toString(),
    label: tipoEquipo.nombre || '',
    clave: tipoEquipo.clave + tipoEquipo.consecutivo || ''
  }));
  
  const statusEquiposOptions = statusEquiposData.map((statusEquipo) => ({
    value: statusEquipo.id.toString(),
    label: statusEquipo.nombre || ''
  }));
  

  return {
    tipoEquiposOptions,
    statusEquiposOptions,
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
    openModalDetails,
    setOpenModalDetails,
    equipoDetails,
    setEquipoDetails,
    onRowClick,
  };
}