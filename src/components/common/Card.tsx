import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  hasCardHeader?: boolean
}
export default function Card({ children, className, hasCardHeader }: Props) {
  return (
    <div
      className={cn(
        "border-b border-gray-200 bg-white rounded-lg shadow ring-1 ring-gray-200",
        hasCardHeader ? "px-0 py-0" : "px-4 py-5 sm:px-6",
        className
      )}
    >
      {children}
    </div>
  )
}

type CardHeaderProps = {
  children: React.ReactNode
  className?: string
  variant?: 'withAction' | 'withDescription'
}

export function CardHeader({ children, className, variant }: CardHeaderProps) {

  if (variant === 'withDescription') {
    return (
      <div className={cn("border-b border-gray-200 bg-white rounded-t-lg ring-1 ring-slate-500 px-4 py-5 sm:px-6", className)}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn("border-b border-gray-200 bg-white rounded-t-lg ring-1 ring-slate-500 px-4 py-5 sm:px-6", className)}>
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        {children}
      </div>
    </div>
  )
}
