import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

type TLink = {
  href?: string
  name: string
  icon?: React.ReactElement
}

export interface Props {
  links: TLink[]
  activeLast?: boolean
}

export default function Breadcrumbs({ links, activeLast = false }: Props) {
  const router = useRouter()
  const currentLink = links[links.length - 1].name

  const listDefault = links.map((link) => (<LinkItem key={link.name} link={link} />))

  const listActiveLast = links.map((link) => (
    <li key={link.name}>
      <div className="flex items-center">
        {links.indexOf(link) !== 0 && (
          <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        )}
        {link.name !== currentLink ? (
          <LinkItem link={link} className={links.indexOf(link) !== 0 ? 'ml-4' : ''} />
        ) : (
          <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            {link.name}
          </span>
        )}
      </div>
    </li>
  )
  )

  return (
    <div>
      <nav className="sm:hidden" aria-label="Back">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Volver
        </button>
      </nav>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          {activeLast ? listDefault : listActiveLast}
        </ol>
      </nav>
    </div>
  )
}


type LinkItemProps = {
  link: TLink
  className?: string
}

function LinkItem({ link, className }: LinkItemProps) {
  const { href = '', name, icon } = link
  return (
    <Link
      href={href}
      key={name}
      className={`text-sm font-medium text-gray-500 hover:text-gray-700 ${className}`}
    >
      {name}
    </Link>

  )
}