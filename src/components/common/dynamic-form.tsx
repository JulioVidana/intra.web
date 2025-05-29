"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type FieldType = "text" | "number" | "select" | "checkbox" | "textarea" | "date"

export interface SelectOption {
  value: string
  label: string
}

export interface FormField<T> {
  name: keyof T & string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  min?: number
  max?: number
  step?: number
  options?: SelectOption[]
  className?: string
  defaultValue?: any
  disabled?: boolean
}

interface DynamicFormProps<T> {
  fields: FormField<T>[]
  initialData?: Partial<T>
  onSubmit: (data: Partial<T>) => void
  submitLabel?: string
  className?: string
  fieldClassName?: string
  gridCols?: number
}

export function DynamicForm<T>({
  fields,
  initialData = {} as Partial<T>,
  onSubmit,
  submitLabel = "Guardar",
  className = "",
  fieldClassName = "",
  gridCols = 1,
}: DynamicFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData)

  
  useEffect(() => {
   
    const currentDataStr = JSON.stringify(formData)
    const newDataStr = JSON.stringify(initialData)

    if (currentDataStr !== newDataStr) {
      setFormData(initialData)
    }
  }, [initialData])

  
  const handleInputChange = (name: keyof T & string, value: any) => {
  
    if (formData[name] !== value) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  
  const gridTemplate = `grid-cols-1 ${gridCols > 1 ? `sm:grid-cols-${Math.min(gridCols, 6)}` : ""}`

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", gridTemplate)}>
        {fields.map((field) => (
          <div key={field.name as string} className={cn("space-y-2", fieldClassName)}>
            <Label htmlFor={field.name}>{field.label}</Label>

            {field.type === "text" && (
              <Input
                id={field.name}
                name={field.name}
                value={(formData[field.name] as string) || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
              />
            )}

            {field.type === "number" && (
              <Input
                id={field.name}
                name={field.name}
                type="number"
                value={(formData[field.name] as number) || ""}
                onChange={(e) => handleInputChange(field.name, Number.parseFloat(e.target.value) || 0)}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step || 1}
                required={field.required}
                disabled={field.disabled}
              />
            )}

            {field.type === "select" && field.options && (
              <Select
                value={(formData[field.name] as string) || ""}
                onValueChange={(value) => handleInputChange(field.name, value)}
                disabled={field.disabled}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder={field.placeholder || `Selecciona ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={!!formData[field.name]}
                  onCheckedChange={(checked) => handleInputChange(field.name, checked)}
                  disabled={field.disabled}
                />
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.placeholder || ""}
                </label>
              </div>
            )}

            {field.type === "textarea" && (
              <Textarea
                id={field.name}
                name={field.name}
                value={(formData[field.name] as string) || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
              />
            )}

            {field.type === "date" && (
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={(formData[field.name] as string) || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                required={field.required}
                disabled={field.disabled}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}

