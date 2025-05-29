import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Textarea } from "@/components/ui/textarea"
  import { useFormContext } from 'react-hook-form'
  
  interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label?: string
    description?: string
    labelVariant?: 'stacked' | 'inline'
  }
  export default function RHFTextArea({ name, label, description, labelVariant = 'stacked', ...other }: Props) {
    const { control } = useFormContext()
  
  
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
                  <Textarea
                    //className="resize-none"
                    {...field}
                    {...other}
                  />
                </FormControl>{
                  description && <FormDescription>{description}</FormDescription>
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
              <Textarea
                //className="resize-none"
                {...field}
                {...other}
              />
            </FormControl>{
              description && <FormDescription>{description}</FormDescription>
            }
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }