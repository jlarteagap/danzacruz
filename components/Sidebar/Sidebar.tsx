import React from 'react'

import SidebarRoutes from '../SidebarRoutes/SidebarRoutes'
import Logo from '../Logo/Logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from '@/components/ui/sidebar'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="mx-3">
        <SidebarGroup />
        <SidebarRoutes />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <footer className="mt-5 p3 text-center">All rigth reserved</footer>
      </SidebarFooter>
    </Sidebar>
  )
}
