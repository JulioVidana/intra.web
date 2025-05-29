import Link from 'next/link'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { NavConfigType } from '@/types/nav-config'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { getActive } from './'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  navConfig: NavConfigType
}

export default function NavList({ navConfig }: Props) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-1">
        {navConfig.map((item) => (
          <li key={item.name}>
            {!item.children ? (
              <Link
                href={item.path}
                className={classNames(
                  getActive(item.path, pathname)
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}
              >
                <item.icon
                  className={classNames(
                    getActive(item.path, pathname)
                      ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-primary',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ) : (
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <DisclosureButton
                      className={classNames(
                        getActive(item.path, pathname)
                          ? 'bg-sidebar-accent text-sidebar-primary'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary',
                        'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0 text-muted-foreground" aria-hidden="true" />
                      {item.name}
                      <ChevronRightIcon
                        className={classNames(
                          open ? 'rotate-90 text-muted-foreground' : 'text-muted-foreground',
                          'ml-auto h-5 w-5 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" className="mt-1 px-2 space-y-1">
                      {item.children?.filter((subItem) => !subItem.invisible).map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className={classNames(
                            getActive(subItem.path, pathname)
                              ? 'bg-sidebar-accent/50 text-sidebar-primary'
                              : 'hover:bg-sidebar-accent/50 text-sidebar-foreground hover:text-sidebar-primary',
                            'block rounded-md py-1 pr-2 pl-9 text-sm leading-6'
                          )}
                        >
                          <div className="flex items-center gap-x-2">
                            {subItem.icon && (
                              <subItem.icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                            )}
                            {subItem.name}
                          </div>
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
