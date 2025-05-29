import type { Metadata } from 'next'
import AsignacionesClient from "./AsignacionesClient"

export const metadata: Metadata = {
  title: "Asignaciones de Equipos",
  description: "Asignaciones de Equipos",
}


export default function AsignacionesPage() {
  return <AsignacionesClient />
}

