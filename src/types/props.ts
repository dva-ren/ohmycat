export interface NavItem {
  name: string
  url: string
  icon: string
  children?: Array<{
    name: string
    url: string
  }>
}
