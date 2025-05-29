import type { Metadata } from 'next'
import EquiposClient from './EquiposClient'

export const metadata: Metadata = {
  title: "Listado de Equipos",
  description: "Listado de Equipos",
}


export default function EquiposPage() {
  return <EquiposClient />
}

