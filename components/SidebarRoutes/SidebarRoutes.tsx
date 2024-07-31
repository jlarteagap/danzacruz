import SidebarItems from '../SidebarItems/SidebarItems'
import { dataGeneralSidebar } from './SidebarRoutes.data'

export default function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
      {dataGeneralSidebar.map(item => (
        <SidebarItems key={item.label} items={item} />
      ))}
    </div>
  )
}
