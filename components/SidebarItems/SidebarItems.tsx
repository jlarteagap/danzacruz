import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SidebarItemProps } from './SidebarItemsProps.types'

export default function SidebarItems(props: SidebarItemProps) {
  const { items } = props
  const { href, icon: Icon, label } = items
  return (
    <Link
      href={href}
      className={cn(
        `flex gap-x-2 text-slate-700 text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1} /> {label}
    </Link>
  )
}
