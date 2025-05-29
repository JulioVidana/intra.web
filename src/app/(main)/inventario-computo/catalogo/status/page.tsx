import type { Metadata } from 'next'
import CatStatusClient from "./CatStatusClient"

export const metadata: Metadata = {
  title: "Catalogo de Estatus",
  description: "Catalogo de Estatus",
}


export default function CatStatusPage() {
  return <CatStatusClient />
}

