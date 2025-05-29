import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
  search: string
  handleSearchChange: (search: string) => void
}

export function TipoEstatusTableToolBar({ search, handleSearchChange }: Props) {
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <Input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(event) => handleSearchChange(event.target.value)}
        className="block w-full pl-10"
      />
    </div>
  )
}

