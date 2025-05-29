import Breadcrumbs, { Props as BreadcrumbsProps } from "./Breadcrumbs"
import { cn } from "@/lib/utils"
interface Props extends BreadcrumbsProps {
  heading?: string
  action?: React.ReactNode
  subHeading?: {
    icon: React.ReactNode
    text: string
    className?: string
  }[]
}
export default function PageHeader({ heading, links, action, subHeading, ...other }: Props) {
  return (
    <div>
      <Breadcrumbs links={links} {...other} />
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-9 text-gray-900 sm:text-3xl sm:tracking-tight">
            {heading}
          </h2>

          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {
              subHeading && subHeading.map((sub, index) => (
                <SubHeading key={index} icon={sub.icon} text={sub.text} className={sub.className} />
              ))
            }
          </div>
        </div>

        {
          action && (
            <div className="mt-4 flex-shrink-0 md:mt-0 md:ml-4">
              {action}
            </div>
          )
        }
      </div>
    </div>
  )
}

type subHeadingProps = {
  icon: React.ReactNode
  text: string
  className?: string
}
export function SubHeading({ icon, text, className }: subHeadingProps) {
  return (
    <div
      className={cn("mt-2 flex items-center text-sm text-gray-500", className)}
    >
      {icon}
      {text}
    </div>
  )
}
