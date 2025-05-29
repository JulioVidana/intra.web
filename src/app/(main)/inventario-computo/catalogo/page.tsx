import type { Metadata } from 'next'
import CatalogsPage from './CatalogosClient'

export const metadata: Metadata = {
  title: "Listado de Catalogos",
  description: "Listado de Catalogos",
}


export default function CatalogosPage() {
    return <CatalogsPage />
}

