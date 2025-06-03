"use client"
import { Fragment } from "react"
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { User } from "@/services/api/auth/model/Authorization"
import { ChevronDown, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useUserPhoto } from "@/hooks/auth/useUserPhoto"
import { Skeleton } from "@/components/ui/skeleton"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  handleLogout: () => void
  user: User | null
}

function getInitials(nombre: string, apellidoPaterno: string): string {
  return `${nombre.charAt(0)}${apellidoPaterno.charAt(0)}`.toUpperCase()
}

export default function AccountPopover({ handleLogout, user }: Props) {
  const { photoUrl, isLoading } = useUserPhoto();
  const fullName = user
    ? `${user.Empleado.Nombre} ${user.Empleado.ApellidoPaterno} ${user.Empleado.ApellidoMaterno}`.trim()
    : "Usuario"

  const renderAvatar = (size: string) => (
    <Avatar className={size}>
      {isLoading ? (
        <Skeleton className="h-full w-full rounded-full" />
      ) : (
        <>
          <AvatarImage 
            src={photoUrl || "/placeholder.svg"} 
            alt={fullName}
            onError={(e) => {
              e.currentTarget.src = "";
            }}
          />
          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white text-xs font-medium">
            {user ? getInitials(user.Empleado.Nombre, user.Empleado.ApellidoPaterno) : "U"}
          </AvatarFallback>
        </>
      )}
    </Avatar>
  );

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors duration-200">
        <div className="flex flex-col items-end text-right">
          <span className="text-sm font-medium text-gray-900 truncate max-w-32">{fullName}</span>
          <span className="text-xs text-gray-500 truncate max-w-32">{user?.Email || ""}</span>
        </div>

        <div className="flex items-center gap-1">
          {renderAvatar("h-10 w-10")}
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        <span className="sr-only">Abrir menú de usuario</span>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              {renderAvatar("h-20 w-20")}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
                <p className="text-sm text-gray-500 truncate">{user?.Email || ""}</p>
              </div>
            </div>

            <Separator className="mb-4" />

            {user?.roles && user.roles.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Roles</p>
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((role: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="mb-4" />

            <div className="space-y-2">

              <MenuItem>
                {({ focus }) => (
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={`w-full justify-start gap-2 h-9 text-red-600 hover:text-red-700 hover:bg-red-50 ${
                      focus ? "bg-red-50 text-red-700" : ""
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Button>
                )}
              </MenuItem>
            </div>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
