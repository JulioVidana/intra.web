import { Catalogos } from "@/types/cat-config"
import { Tag, Package } from "lucide-react"

export const catalogos: Catalogos[] = [
    {
      id: "status",
      name: "Estatus",
      description: "Catálogo de estatus posibles para equipos",
      itemCount: 4,
      icon: <Tag className="w-8 h-8 mr-2 text-primary" />
    },
    {
      id: "equipos",
      name: "Tipos de Equipos",
      description: "Catálogo de tipos de equipos disponibles",
      itemCount: 5,
      icon: <Package className="w-8 h-8 mr-2 text-primary" />
    },

  ]