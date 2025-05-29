
"use client";

import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { useCreateEditTipoEquipos } from "@/hooks/inventario/catInventario/useCreateEditTipoEquipos";
import { Button } from "@/components/ui/button";
import { TipoEquipos } from "@/services/api/inventario-computo/models/TipoEquipos";
import { mapTipoEquipoToFormData } from "@/services/api/inventario-computo/mappers/mapTipoEquipoToFormData";
type Props = {
  onSuccess?: () => void;
  initialValues?: TipoEquipos;
};

export default function TipoEquipoForm({ onSuccess,initialValues }: Props) {

  const initialValuesForm = initialValues ? mapTipoEquipoToFormData(initialValues) : undefined;

  const { methods, onSubmit, handleSubmit, isPending, isEdit } = useCreateEditTipoEquipos(onSuccess,initialValuesForm);

  return (
<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
 
      <RHFTextField
        label="Nombre"
        name="nombre"
        labelVariant="stacked"
        maxLength={255}
      />
      <RHFTextField
        label="Clave"
        name="clave"
        labelVariant="stacked"
        maxLength={255}
      />
    </div>

    <div className="flex justify-end mt-6">
      <Button type="submit" className={`${isPending ? "bg-gray-400" : ""} ${isEdit ? "bg-yellow-600 hover:bg-yellow-700" : ""} text-white px-4 py-2 rounded-md`} disabled={isPending}>
        {isPending ? "Guardando..." : isEdit ? "Actualizar" : "Guardar"}
      </Button>
    </div>
  </FormProvider> 
  )
}
