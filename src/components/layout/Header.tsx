"use client"
import { Bars3Icon } from '@heroicons/react/24/outline'
import { SearchIcon } from "lucide-react"
import AccountPopover from "./header/AccountPopover"
import { useMainHeader } from '@/hooks/useMainHeader'
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Header() {
  const { toggleSidebar, handleLogout, user } = useMainHeader()
  const [search, setSearch] = useState("")

  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-xs backdrop-opacity-100">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden cursor-pointer hover:bg-sidebar-accent rounded-md" onClick={toggleSidebar}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative w-1/6 max-w-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {user && (
            <AccountPopover handleLogout={handleLogout} user={user} />
          )}
        </div>
      </div>
    </header>
  )
}
