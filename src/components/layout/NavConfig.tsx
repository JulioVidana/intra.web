import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import { NavConfigType } from '@/types/nav-config'
import { PATH_PAGE } from '@/routes/paths'

export const navConfig: NavConfigType = [
  {
    name: "Inicio",
    path: PATH_PAGE.root,
    icon: HomeIcon,
  },
  {
    name: "Inventario",
    path: PATH_PAGE.inventarioComputo.root,
    icon: ClipboardDocumentListIcon,
    children: [
      { name: "Catálogos", path: PATH_PAGE.inventarioComputo.catalogo, icon: Cog6ToothIcon },
      { name: "Catálogo Equipos", path: PATH_PAGE.inventarioComputo.catalogoEquipo, invisible: true },
      { name: "Catálogo Status", path: PATH_PAGE.inventarioComputo.catalogoStatus, invisible: true },
      { name: "Listado Equipos", path: PATH_PAGE.inventarioComputo.listadoEquipos, icon: ListBulletIcon },
    ],
  }
] 