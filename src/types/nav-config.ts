type NavChildren = {
  name: string
  path: string
  icon?: React.ElementType
  invisible?: boolean
}

export type NavItem = {
  name: string
  path: string
  icon: React.ElementType
  invisible?: boolean
  children?: NavChildren[]
}


export type NavConfigType = NavItem[]