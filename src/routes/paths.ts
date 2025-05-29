function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
}

export const PATH_PAGE = {
  root: '/',
  inventarioComputo:
  {
    root: '/inventario-computo',
    catalogoEquipo: '/inventario-computo/catalogo/equipos',
    catalogoStatus: '/inventario-computo/catalogo/status',
    listadoEquipos: '/inventario-computo/equipos',
    catalogo: '/inventario-computo/catalogo',
    listadoAsignaciones: '/inventario-computo/asignaciones',
    listadoResguardos: '/inventario-computo/resguardos'
  }
}