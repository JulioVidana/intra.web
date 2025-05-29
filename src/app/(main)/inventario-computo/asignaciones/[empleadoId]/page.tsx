import type { Metadata } from 'next'
import AsignacionEmpleadoClient from "./AsignacionEmpleadoClient"

export const metadata: Metadata = {
  title: "Asignaciones de Equipos",
  description: "Asignaciones de Equipos",
}

export default function AsignacionesPage() {
  return <AsignacionEmpleadoClient />
}

