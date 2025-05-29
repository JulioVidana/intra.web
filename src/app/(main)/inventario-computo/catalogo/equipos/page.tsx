import type { Metadata } from 'next'
import CatEquiposClient from "./CatEquiposClient"

export const metadata: Metadata = {
  title: "Catalogo de Equipos",
  description: "Catalogo de Equipos",
}


export default function CatEquiposPage() {
  return <CatEquiposClient />
}

