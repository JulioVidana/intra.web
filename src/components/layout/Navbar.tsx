"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import Image from 'next/image'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon, } from '@heroicons/react/24/outline'
import { navConfig } from './NavConfig'
import { NavList } from '@/components/nav-section'
import { useSidebarStore } from '@/store/sideBarStore'
import { Separator } from '@/components/ui/separator'

export default function Navbar() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore()
  const pathname = usePathname()

  useEffect(() => {
    if (isSidebarOpen) {
      toggleSidebar()
    }
 
  }, [pathname])


  return (
    <>
      <Transition show={isSidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={toggleSidebar}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={toggleSidebar}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center gap-4 py-4">
                    <Image
                      className="h-10 w-auto"
                      width={155}
                      height={50}
                      src="/logo/logo-isaf-min.png"
                      alt="Logo"
                    />
                    <Separator orientation="vertical" className="h-8" />
                    <span className="text-xl font-semibold text-primary">Intranet</span>
                  </div>
                  <NavList navConfig={navConfig} />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-4 pb-4 border-r border-gray-200 border-dashed">
          <div className="flex h-16 shrink-0 items-center gap-4 py-4">
            <Image
              className="h-10 w-auto"
              width={100}
              height={50}
              src="/logo/logo-isaf-min.png"
              alt="Logo"
            />
            <Separator orientation="vertical" className="h-8" />
            <span className="text-xl font-semibold text-primary">Intranet</span>
          </div>
          <NavList navConfig={navConfig} />
        </div>
      </div>
    </>
  )
}