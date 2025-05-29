"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { catalogos } from "@/components/layout/inventario-computo/CatConfig"
import { Package, Tag } from "lucide-react"
import Link from "next/link"

export function CatalogList() {
  const catalogs = catalogos

  const getIcon = (id: string) => {
    switch (id) {
      case "status":
        return <Tag className="h-8 w-8 text-primary" />
      case "tipo-equipo":
        return <Package className="h-8 w-8 text-primary" />
      default:
        return <Tag className="h-8 w-8 text-primary" />
    }
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {catalogs.map((catalog) => (
        <Card key={catalog.id}>
          <CardHeader className="pb-2">
            <div className="mb-2">{catalog.icon}</div>
            <CardTitle>{catalog.name}</CardTitle>
            <CardDescription>{catalog.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/inventario-computo/catalogo/${catalog.id}`}>Administrar</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
