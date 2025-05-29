import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Combobox, OptionType } from "@/components/ui/combobox"

import { useFormContext } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeHolder?: string
  description?: string
  labelVariant?: 'stacked' | 'inline'
  options: OptionType[]
  disabled?: boolean
  asChild?: boolean
}
export default function RHFCombobox({ name, label, description, labelVariant = 'stacked', options, placeHolder, disabled, asChild, ...other }: Props) {
  const { control } = useFormContext()


  if (labelVariant === 'inline') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">{label}</FormLabel>
            <div className="col-span-3">
              <Combobox
                optionLabel={placeHolder ?? 'an option...'}
                selected={field.value}
                onChange={field.onChange}
                nested={asChild}
                options={options}
                disabled={disabled}
              />
              {description && <FormDescription>{description}</FormDescription>
              }
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    )

  }


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Combobox
              optionLabel={placeHolder ?? 'an option...'}
              selected={field.value}
              onChange={field.onChange}
              options={options}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>
          }
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
