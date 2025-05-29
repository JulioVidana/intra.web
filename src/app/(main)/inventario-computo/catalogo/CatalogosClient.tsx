"use client"
import { CatalogList } from "@/components/inventario/catalogos/catalogos-list"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { PATH_PAGE } from "@/routes/paths"
import { Plus, Tag } from "lucide-react"

export default function CatalogsPage() {
  return (
    <div className="space-y-6">
        <PageHeader
        heading="Catálogos"
        links={[
          {
            name: "Inventario de Cómputo",
            href: PATH_PAGE.root
          },
          {
            name: "Catálogos",
            href: PATH_PAGE.inventarioComputo.catalogo
          }
        ]}
        subHeading={[{
          icon: <Tag className="w-4 h-4 mr-2" />,
          text: "Selecciona un catálogo para administrar sus elementos",
          className: "text-muted-foreground"
        }]} />
      <CatalogList />
    </div>
  )
}
