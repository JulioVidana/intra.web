
"use client";

import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { TipoEstatus } from "@/services/api/inventario-computo/models/TipoEstatus";
import { mapTipoEstatusToFormData } from "@/services/api/inventario-computo/mappers/mapTipoEstatusToFormData";
import { useCreateEditTipoEstatus } from "@/hooks/inventario/catStatus/useCreateEditTipoEstatus";
type Props = {
  onSuccess?: () => void;
  initialValues?: TipoEstatus;
};

export default function TipoEstatusForm({ onSuccess,initialValues }: Props) {

  const initialValuesForm = initialValues ? mapTipoEstatusToFormData(initialValues) : undefined;

  const { methods, onSubmit, handleSubmit, isPending, isEdit } = useCreateEditTipoEstatus(onSuccess,initialValuesForm);

  return (
<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <div className="w-full">
 
      <RHFTextField
        label="Nombre"
        name="nombre"
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
