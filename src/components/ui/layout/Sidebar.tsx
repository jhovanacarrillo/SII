import { useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Home,
  Calendar,
  Contact,
  FolderArchive,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Inicio", icon: Home, path: "/dashboard" },
  { name: "Calendario", icon: Calendar, path: "/calendario" },
  { name: "Agenda", icon: Contact, path: "/agenda" },
  { name: "Administración", icon: FolderArchive, path: "/administracion" },
]

export default function SidebarLayout() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "order-r shadow-md flex flex-col transition-all duration-300",
          isOpen ? "w-72" : "w-16"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <div>
              <h2 className="text-2xl font-bold">Data Center</h2>
              <p className="text-sm text-muted-foreground mt-1">Panel de navegación</p>
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto"
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>

        <Separator />

        <ScrollArea className="flex-1 px-2">
          <nav className="flex flex-col gap-1 mt-4">
            <TooltipProvider>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Tooltip key={item.name} delayDuration={500}>
                    <TooltipTrigger asChild>
                      <Link to={item.path}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-2 rounded-md",
                            isActive && "bg-muted font-semibold",
                            !isOpen && "justify-center"
                          )}
                        >
                          <item.icon size={18} />
                          {isOpen && item.name}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    {!isOpen && <TooltipContent side="right">{item.name}</TooltipContent>}
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </nav>
        </ScrollArea>

        <Separator />

        <div className="p-2 text-xs text-muted-foreground text-center">
          {isOpen && `© ${new Date().getFullYear()} Unidad Técnica de Cómputo`}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
