import { format, startOfToday } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"
import { useFormContext } from 'react-hook-form'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form"
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
  placeHolder?: string
  disabled?: boolean
  disabledFn?: (value: any) => boolean
  yearPicker?: boolean
  disablePastDates?: boolean
  disableFutureDates?: boolean
  className?: string
  customIcon?: React.ReactNode
}

export default function RHFDatePicker({
  name,
  label,
  description,
  placeHolder = 'Pick a date',
  disabled,
  disabledFn,
  yearPicker,
  disablePastDates = false,
  disableFutureDates = false,
  className,
  customIcon,
}: Props) {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)

  const disableDate = (date: Date) => {
    if (disablePastDates) {
      return date < startOfToday();
    }
    if (disableFutureDates) {
      return date > startOfToday();
    }
    return disabledFn ? disabledFn(date) : false;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          {label && (
            <FormLabel>
              {label}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={disabled} asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                    className
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {
                        customIcon ? customIcon : <CalendarIcon className="mr-2 h-4 w-4" />
                      }

                      {field.value ? (
                        format(new Date(field.value), "P")
                      ) : (
                        <span>{placeHolder}</span>
                      )}
                    </div>
                    {field.value && (
                      <XIcon
                        className="h-4 w-4 opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange("");
                        }}
                      />
                    )}
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"  avoidCollisions={false} side="bottom" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                disabled={disableDate}
               
              />
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}