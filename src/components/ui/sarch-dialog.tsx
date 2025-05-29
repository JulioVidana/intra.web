"use client"

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { useEffect, useState } from "react"
import { Badge } from "./badge"
import { User } from "lucide-react"

export interface SearchItem {
  id: string | number
  clave?: string
  descripcion: string
  subDescripcion?: string
}

interface SearchDialogProps<T extends SearchItem> {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: T[]
  onSelectItem: (item: T) => void
  placeholder?: string
  heading?: string
  onSearchChange?: (value: string) => void
  isLoading?: boolean
}

export default function SearchDialog<T extends SearchItem>({
  open,
  onOpenChange,
  items,
  onSelectItem,
  placeholder = "Buscar...",
  heading = "Resultados",
  onSearchChange,
  isLoading = false
}: SearchDialogProps<T>) {
  const [inputValue, setInputValue] = useState("")
  const [filteredItems, setFilteredItems] = useState<T[]>(items)

  useEffect(() => {
    if (open) {
      setInputValue("")
      if (!onSearchChange) setFilteredItems(items)
    }
  }, [open, items, onSearchChange])

  const handleSearch = (value: string) => {
    setInputValue(value)

    if (onSearchChange) {
      onSearchChange(value)
    } else {
      const searchTerm = value.toLowerCase()
      const filtered = items.filter(item =>
        item.descripcion.toLowerCase().includes(searchTerm) ||
        (item.clave && item.clave.toLowerCase().includes(searchTerm)) ||
        (item.subDescripcion && item.subDescripcion.toLowerCase().includes(searchTerm))
      )
      setFilteredItems(filtered)
    }
  }

  const displayItems = onSearchChange ? items : filteredItems


  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={placeholder}
        onValueChange={handleSearch}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation()
            onOpenChange(false)
          }
        }}
      />


      <CommandList className="max-h-[500px] w-full overflow-y-auto">
        {displayItems.length === 0 && (
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        )}
        {displayItems.map((item) => (
          <CommandItem
            key={item.id}
            value={`${item.descripcion?.toLowerCase() ?? ''} ${item.subDescripcion?.toLowerCase() ?? ''}`}
            onSelect={() => {
              onSelectItem(item)
              onOpenChange(false)
            }}
          >
            <div className="flex items-center rounded-lg cursor-pointer w-full">
              {item.clave && !item.subDescripcion && (
                <>
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    {item.clave}
                  </Badge>
                  <span className="text-base font-medium text-foreground leading-tight truncate">
                    {item.descripcion}
                  </span>
                </>
              )}
              {item.subDescripcion && (
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex justify-between items-center w-full">
                  <span className="text-base font-medium flex items-center gap-2 text-foreground leading-tight truncate">
                    <User className="w-4 h-4" />
                    {item.descripcion}
                  </span>
                  {item.clave && (
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    {item.clave}
                    </Badge>
                  )}
                  </div>
                  <span
                    className="text-xs font-semibold text-gray-500 text-start px-3 py-1"
                  >
                    {item.subDescripcion}
                  </span>
                </div>
              )}
            </div>
          </CommandItem>

        ))}
      </CommandList>
    </CommandDialog>
  )
}
