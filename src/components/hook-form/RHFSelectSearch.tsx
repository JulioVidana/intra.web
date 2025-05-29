'use client'

import { Controller, useFormContext } from 'react-hook-form'
import SelectSearch, { SelectSearchProps } from '../ui/select-search'

interface RHFSelectSearchProps<T extends { id: number | string }> extends Omit<SelectSearchProps<T>, 'value' | 'onChange' | 'error'> {
  name: string
}

export default function RHFSelectSearch<T extends { id: number | string }>({
  name,
  ...other
}: RHFSelectSearchProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
       
        const currentValue = typeof value === 'object' ? value : null;

        return (
          <SelectSearch
            {...other}
            {...field}
            value={currentValue}
            onChange={onChange}
            error={error?.message}
          />
        );
      }}
    />
  )
}
