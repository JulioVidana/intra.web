export { default as NavList } from './NavList'

export function isExternalLink(path: string) {
  return path.includes('http')
}

export function getActive(path: string, pathname: string) {
  const checkPath = path.startsWith('#')

  if (path === '/') {
    return pathname === '/'
  }

  return (!checkPath && pathname.includes(path))
}
