
"use client";

import FormProvider from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { useCreateEditEquipos } from "@/hooks/inventario/equipos/useCreateEditEquipos";
import RHFCombobox from "@/components/hook-form/RHFCombobox";
import RHFDatePicker from "@/components/hook-form/RFHDatePicker";
import { Button } from "@/components/ui/button";
import { Equipos } from "@/services/api/inventario-computo/models/Equipos";
import { mapEquipoToFormData } from "@/services/api/inventario-computo/mappers/mapEquiposToForm";
import RHFTextArea from "@/components/hook-form/RHFTextArea";

type Props = {
  onSuccess?: () => void;
  initialValues?: Equipos;
};

export default function EquipoForm({ onSuccess,initialValues }: Props) {

  const initialValuesForm = initialValues ? mapEquipoToFormData(initialValues) : undefined;
  
  const { 
    methods, 
    onSubmit, 
    handleSubmit, 
    isPending, 
    isEdit, 
    tipoEquiposOptions, 
    statusEquiposOptions 
  } = useCreateEditEquipos(onSuccess,initialValuesForm);

  
  return (
<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
      {/* Selects de la primera fila */}
      <div>
        <RHFCombobox
          name="tiposEquiposId"
          label="Tipo de Equipo"
          options={tipoEquiposOptions}
          labelVariant="stacked"
          placeHolder="Selecciona un tipo de equipo"
        />
      </div>
      <div>
        <RHFCombobox
          name="statusId"
          label="Estatus"
          options={statusEquiposOptions}
          labelVariant="stacked"
          placeHolder="Selecciona un estatus"
        />
      </div>

      <RHFTextField
        label="Clave SIIF"
        name="claveSIIF"
        labelVariant="stacked"
        maxLength={255}
      />

      
      <RHFTextField
        label="Numero de Factura"
        name="factura"
        labelVariant="stacked"
        maxLength={255}
      />

      <RHFDatePicker
        label="Fecha de Factura"
        name="fechaFactura"
      />

      <RHFTextField
        label="Valor del Equipo"
        name="valor"
        labelVariant="stacked"
        maxLength={255}
        numberVariant="decimal"
      />
      {methods.watch("statusId") === '2' && (
        <RHFDatePicker
          name="fechaBaja"
          label="Fecha de baja"
          yearPicker={true}
        />
      )}
     <div className="md:col-span-2">
      <RHFTextField
        label="Descripción"
        name="descripcion"
        labelVariant="stacked"
        maxLength={255}
      />
      </div>
      <RHFTextField
        label="Clave"
        name="clave"
        labelVariant="stacked"
        maxLength={255}
      />
      <RHFTextField
        label="Número de serie"
        name="numSerie"
        labelVariant="stacked"
        maxLength={255}
      />
      <RHFTextArea
        label="Características"
        name="caracteristicas"
        labelVariant="stacked"
        maxLength={255}
      />
      <RHFTextArea
        label="Ubicación"
        name="ubicacion"
        labelVariant="stacked"
        maxLength={255}
      />
      <div className="md:col-span-2">
      <RHFTextArea
        label="Observaciones"
        name="observaciones"
        labelVariant="stacked"
        maxLength={255}
      />
      </div>
      
      
    </div>

    <div className="flex justify-end mt-6">
      <Button type="submit" className={`${isPending ? "bg-gray-400" : "bg-primary"} ${isEdit ? "bg-yellow-600 hover:bg-yellow-700" : ""} text-white px-4 py-2 rounded-md`} disabled={isPending}>
        {isPending ? "Guardando..." : isEdit ? "Actualizar" : "Guardar"}
      </Button>
    </div>
  </FormProvider> 
  )
}
