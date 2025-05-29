import React from "react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useToggle } from "@/hooks/common/useToggle"
import { PatternFormat } from 'react-number-format'
import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
  labelVariant?: 'stacked' | 'inline'
  numberVariant?: 'decimal' | 'integer'
  icon?: React.ReactNode
  className?: string
}

export default function RHFTextField({ name, label, description, labelVariant = 'stacked', numberVariant = 'integer', icon, className, ...other }: Props) {
  const { control } = useFormContext()

  const renderInput = (field: ControllerRenderProps<FieldValues, string>) => (
    <div className="relative">
      {icon && <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">{icon}</div>}
      {
        other.type === 'password' ?
          <PasswordField field={field} {...other} />
          :
          other.type === 'tel' ?
            <PatternFormat
              format="+1 (###) ###-####"
              mask="_"
              allowEmptyFormatting
              customInput={Input}
              value={field.value}
              onValueChange={({ formattedValue, value }) => {
                field.onChange(value)
              }}
              disabled={other.disabled}
              className={cn(
                className,
                icon && "peer ps-9 [direction:inherit]"
              )}
              role="textbox"
              data-testid={name}
            />
            :
            <Input
              className={cn(
                className,
                icon && "peer ps-9 [direction:inherit]"
              )}
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              onChange={(e) => {
                if (other.type === 'number') {
                  if (isNaN(parseFloat(e.target.value))) {
                    field.onChange(0)
                    return
                  }
                  numberVariant === 'decimal' ?
                    field.onChange(parseFloat(e.target.value))
                    :
                    field.onChange(parseInt(e.target.value))

                } else {
                  field.onChange(e.target.value)
                }
              }}
              role="textbox"
              data-testid={name}
              {...other}
            />
      }
    </div>
  )

  if (labelVariant === 'inline') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">{label}</FormLabel>
            <div className="col-span-3 space-y-1">
              <FormControl>
                {renderInput(field)}
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
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
            {renderInput(field)}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ControllerRenderProps<FieldValues, string>
}
function PasswordField({ field, ...other }: PasswordProps) {
  const [value, toggle] = useToggle(false)

  return (
    <div className="relative">
      <Input
        {...field}
        {...other}
        type={value ? "text" : "password"}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onClick={toggle}
      >
        {value ? (
          <EyeOffIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  )
}