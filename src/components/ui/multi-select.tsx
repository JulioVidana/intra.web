"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export type OptionType = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: (values: string[]) => void
  optionLabel?: string
  disabled?: boolean
  className?: string
  /** Set to true when used inside another popover */
  nested?: boolean
  /** Maximum number of badges to show before collapsing */
  maxVisible?: number
  onSearchChange?: (value: string) => void
}

export function MultiSelect({
  options,
  selected,
  onChange,
  optionLabel = "options",
  disabled,
  className,
  nested = false,
  maxVisible = 10,
  onSearchChange,
  ...props
}: MultiSelectProps) {
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
    if (!open) {
      setInputValue("")
    }
  }, [open])

  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return options

    const lowerCaseInput = inputValue.toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(lowerCaseInput))
  }, [options, inputValue])

  const handleSelect = React.useCallback(
    (value: string) => {
      onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value])
    },
    [onChange, selected],
  )

  const handleRemove = React.useCallback(
    (value: string, e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(selected.filter((item) => item !== value))
    },
    [onChange, selected],
  )

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (nested) {
        e.stopPropagation()
      }
    },
    [nested],
  )

  const selectedLabels = React.useMemo(() => {
    return selected.map((value) => {
      const option = options.find((opt) => opt.value === value)
      return option ? option.label : value
    })
  }, [selected, options])

  const visibleSelections = selectedLabels.slice(0, maxVisible)
  const hiddenCount = Math.max(0, selectedLabels.length - maxVisible)

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
            className={cn(
              "w-full justify-between min-h-10 h-auto text-black/70",
              selected.length > 0 ? "pl-3 pr-3" : "px-4",
            )}
            type="button"
            onClick={(e) => {
              if (nested) {
                e.stopPropagation()
              }
            }}
          >
            <div className="flex flex-wrap gap-1 items-center mr-2 max-w-[calc(100%-2rem)]">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{`Select ${optionLabel}`}</span>
              ) : (
                <>
                  {visibleSelections.map((label) => (
                    <Badge 
                      key={label} 
                      variant="secondary" 
                      className="flex items-center gap-1 px-2 py-0.5 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="truncate">{label}</span>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const value = options.find((opt) => opt.label === label)?.value;
                          if (value) handleRemove(value, e);
                        }}
                        className="flex items-center"
                      >
                        <X className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" />
                      </div>
                    </Badge>
                  ))}
                  {hiddenCount > 0 && (
                    <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                      +{hiddenCount} more
                    </Badge>
                  )}
                </>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
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
              placeholder={`Search ${optionLabel}`}
              className="h-9"
              value={inputValue}
              onValueChange={(value) => {
                setInputValue(value);
                onSearchChange?.(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.stopPropagation()
                  setOpen(false)
                }
              }}
            />
            <CommandList>
              {filteredOptions.length === 0 && <CommandEmpty>No hay resultados</CommandEmpty>}
              <CommandGroup className="overflow-auto max-h-[200px]">
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value+option.label}
                    onSelect={() => handleSelect(option.value)}
                    className="text-black cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onPointerDown={(e) => {
                      if (nested) {
                        e.stopPropagation()
                      }
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")}
                    />
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
