import { useState, useEffect } from "react"
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
  Sun,
  Moon,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Inicio", icon: Home, path: "/dashboard" },
  { name: "Calendario", icon: Calendar, path: "/calendario" },
  { name: "Agenda", icon: Contact, path: "/agenda" },
  { name: "SIU", icon: FolderArchive, path: "/soporte" },
]

export default function SidebarLayout() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  // Estado para tema (true = oscuro)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
    }
    return false
  })

  // Actualiza la clase 'dark' en <html> al cambiar darkMode
  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "order-r shadow-md border  flex flex-col transition-all duration-300",
          "bg-white text-black dark:bg-neutral-950 dark:text-white",
          isOpen ? "w-72" : "w-16"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <div>
              <h2 className="text-2xl font-bold">Data Center</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Panel de navegación
              </p>
            </div>
          )}

          <div className="flex gap-2 ml-auto">
            {/* Botón para cambiar tema */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Botón para abrir/cerrar sidebar */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
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

        <div className="p-2 text-xs text-gray-600 dark:text-gray-400 text-center">
          {isOpen && `© ${new Date().getFullYear()} Unidad Técnica de Cómputo`}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6 bg-neutral-100 text-black dark:bg-neutral-950 dark:text-white">
        <Outlet />
      </main>
    </div>
  )
}
