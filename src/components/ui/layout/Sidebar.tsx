import { useState, useEffect } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils"
import {
  IconCalendarWeek,
  IconAddressBook,
  IconFolderSearch,
  IconChevronLeft,
  IconChevronRight,
  IconSun,
  IconMoon,
  IconDeviceDesktopPlus
} from "@tabler/icons-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Calendario", icon: IconCalendarWeek, path: "/calendario" },
  { name: "Agenda", icon: IconAddressBook, path: "/agenda" },
  { name: "Administración", icon: IconFolderSearch, path: "/administracion" },
]

export default function SidebarLayout() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate();

  //Tema
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
    }
    return false
  })

  // Actualizar "dark"
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
          "order-r shadow-md flex flex-col justify-between transition-all duration-300",
          "bg-white text-black dark:bg-neutral-950 dark:text-white",
          isOpen ? "w-72" : "w-16"
        )}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between p-4">
            {isOpen && (
              <div>
                <h2 className="text-2xl font-bold">Data Center</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Panel de navegación
                </p>
              </div>
            )}

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IconChevronLeft /> : <IconChevronRight />}
            </Button>
          </div>

          <Separator />

          <ScrollArea className="flex-1 px-2">
            <nav className="flex flex-col gap-2 mt-4">
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
        </div>

        {/* Bottom */}
        <div className="p-4 flex flex-col items-left gap-4">
          {/* Botón Generar Reporte */}
          <TooltipProvider>
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate("/soporte")}
                  className={cn(
                    "w-full justify-start gap-2 rounded-md",
                    !isOpen && "justify-center"
                  )}
                >
                  <IconDeviceDesktopPlus size={18} />
                  {isOpen && "Generar Reporte"}
                </Button>
              </TooltipTrigger>
              {!isOpen && <TooltipContent side="right">Generar Reporte</TooltipContent>}
            </Tooltip>
          </TooltipProvider>

          {/* Botón modo oscuro */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? <IconSun size={18} /> : <IconMoon size={18} />}
          </Button>

          {isOpen && (
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} Unidad Técnica de Cómputo
            </div>
          )}
        </div>
      </aside>


      <main className="flex-1 overflow-auto p-6 bg-neutral-100 text-black dark:bg-neutral-950 dark:text-white">
        <Outlet />
      </main>
    </div>
  )
}
