'use client'

import SidebarItems from '../SidebarItems/SidebarItems'
import { dataGeneralSidebar } from './SidebarRoutes.data'

export default function SidebarRoutes() {
  return (
    <aside className="flex flex-col justify-between h-full">
      <div>
        <h2 className="font-semibold mb-3">Panel del festival</h2>
        {dataGeneralSidebar.map(item => (
          <SidebarItems key={item.label} items={item} />
        ))}
      </div>
      <footer className="mt-5 p3 text-center">All rigth reserved</footer>
    </aside>
  )
}