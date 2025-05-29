"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type OptionType = {
  label: string
  value: string
}

interface ComboboxProps {
  options: OptionType[]
  selected: string
  onChange: (value: string) => void
  optionLabel?: string
  disabled?: boolean
  className?: string
  /** Set to true when used inside another popover */
  nested?: boolean
  onInputChange?: (value: string) => void
}

export function Combobox({
  options,
  selected,
  onChange,
  optionLabel = "option",
  disabled,
  className,
  nested = false,
  onInputChange,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [buttonWidth, setButtonWidth] = React.useState<number | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth)
    }
  }, [])

  React.useEffect(() => {
    if (onInputChange) {
      onInputChange(inputValue.toLowerCase())
    }
  }, [inputValue])

  React.useEffect(() => {
    if (!open) {
      setInputValue("")
    }
  }, [open])

 
  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return options

    const lowerCaseInput = inputValue.toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(lowerCaseInput))
  }, [options, inputValue])

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (nested) {
        e.stopPropagation()
      }
    },
    [nested],
  )

  return (
    <div
      className="relative w-full"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false)
          e.stopPropagation()
        }
      }}
      onPointerDown={handlePointerDown}
    >
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-black/70"
            type="button"
            onClick={(e) => {
              if (nested) {
                e.stopPropagation()
              }
            }}
          >
            <span className="text-left truncate">
              {selected ? options.find((option) => option.value === selected)?.label : `Select ${optionLabel}`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("p-0", className, nested && "z-[100]")}
          style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}
          sideOffset={5}
          align="start"
          onPointerDownOutside={(e) => {
            if (nested) {

              e.preventDefault()
            }
          }}
          onInteractOutside={(e) => {
            if (nested) {

              if (e.type !== "keydown") {
                e.preventDefault()
              }
            }
          }}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={`Buscar ${optionLabel}`}
              className="h-9"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {

                if (e.key === "Escape") {
                  e.stopPropagation()
                  setOpen(false)
                }
              }}
            />
            <CommandList>
              {filteredOptions.length === 0 && <CommandEmpty>No results found</CommandEmpty>}
              <CommandGroup className="overflow-auto max-h-[200px]">
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className="text-black cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onPointerDown={(e) => {
                      if (nested) {
                        e.stopPropagation()
                      }
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", option.value === selected ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
