interface DataTableTitleProps {
  title: string
  description?: string
}

export function DataTableTitle({ title, description }: DataTableTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
  )
}

