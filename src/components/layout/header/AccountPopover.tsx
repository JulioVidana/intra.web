import { Fragment } from 'react'
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/authStore'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  handleLogout: () => void
}

export default function AccountPopover({ handleLogout }: Props) {
  const { userData } = useAuthStore()

  return (
    <>
      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <span className="sr-only">Open user menu</span>
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </AvatarFallback>
          </Avatar>
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
          <MenuItems className="absolute right-0 z-10 mt-2.5 w-auto min-w-26 max-w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none space-y-1">
            <MenuItem>
              <a
                className={classNames(
                  'block px-3 py-1 text-sm leading-6 text-gray-900 w-full'
                )}
              >
                {userData?.name || 'Usuario'}
              </a>
            </MenuItem>
            <MenuItem>
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 w-full whitespace-nowrap"
              >
                Cerrar sesión
              </Button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </>
  )
}
