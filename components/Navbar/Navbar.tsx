import { Menu } from 'lucide-react'
import { SheetContent, SheetTrigger, Sheet } from '../ui/sheet'
import SidebarRoutes from '../SidebarRoutes/SidebarRoutes'

export default function Nabvar() {
  return (
    <div className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background h-20">
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className=""></div>
    </div>
  )
}
