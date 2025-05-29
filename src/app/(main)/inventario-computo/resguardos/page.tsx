import type { Metadata } from 'next'
import ResguardosClient from './ResguardosClient'

export const metadata: Metadata = {
  title: "Listado de Resguardos",
  description: "Listado de Resguardos",
}


export default function ResguardosPage() {
  return <ResguardosClient />
}

