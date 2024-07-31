import { LucideIcon } from 'lucide-react'

export type SidebarItemProps = {
  items: {
    label: string
    icon: LucideIcon
    href: string
  }
  key: string
}
