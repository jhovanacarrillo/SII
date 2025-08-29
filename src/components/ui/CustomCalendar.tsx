"use client"
import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/es"
import axios from "axios"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendarEvent,
  IconMapPin,
  IconWorld,
  IconLock,
  IconUsers,
  IconArrowBack,
  IconDotsVertical,
  IconEdit, 
  IconTrash,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export interface CalendarEvent {
  id?: number
  date: string
  title: string
  description?: string
  user?: {
    id: number
    name: string
    email: string
    area?: {
      id: number
      name: string
      acronym: string
      email: string
      image: string
    }
  }
  site?: string // lugar
  start?: string
  end?: string
  tipo?: string //privado o público
  area?: string
  type?: string  //sesión, capacitación, etc
  //name?: string
  scope?: string //modalidad
  consecutivo?: string
  consecutiva?: number
  responsable?: string
}

interface Props {
  events?: CalendarEvent[]
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
}

dayjs.locale("es")

export default function CustomCalendar({ events = [], setEvents }: Props) {

  const today = dayjs()
  const [month, setMonth] = React.useState(today.month())
  const [year, setYear] = React.useState(today.year())
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [openNewEventModal, setOpenNewEventModal] = React.useState(false)
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date())
  //const [startDate, setStartDate] = React.useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = React.useState<string>("09:00")
  const [endTime, setEndTime] = React.useState<string>("10:00")
  const [isMobile, setIsMobile] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState("")
  const [newResponsable, setNewResponsable] = React.useState("")
  const [newLugar, setNewLugar] = React.useState("")
  const [newArea, setNewArea] = React.useState("")
  const [isPrivate, setIsPrivate] = React.useState(false)
  const [newTipo, setNewTipo] = React.useState("") // Sesión por defecto
  const [selectedComision, setSelectedComision] = React.useState("") // Comisión
  const [selectedSite, setSelectedSite] = React.useState("")
  const [newScope, setNewScope] = React.useState("") // Modalidad
  const [newConsecutivo, setNewConsecutivo] = React.useState("") // Tipo de sesión
  const [newConsecutiva, setNewConsecutiva] = React.useState<number | undefined>(undefined) // Número de sesión
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)


  const tiposDeEvento = [
  { id: 1, name: "Sesión", color: "#9D1137" },
  { id: 2, name: "Capacitación", color: "#7F201F" },
  { id: 3, name: "Curso", color: "#3F3F45" },
  { id: 4, name: "Plática", color: "#4D0923" },
  { id: 5, name: "Reunión", color: "#324155" },
  { id: 6, name: "Ceremonia", color: "#404040" },
  { id: 7, name: "Diálogos Transparentes", color: "#162455" },
  { id: 8, name: "Otro" },
]


const tipoColorMap: { [key: string]: string } = {
  "1": "bg-rose-800",     // Sesión
  "2": "bg-red-900", // Capacitación
  "3": "bg-zinc-700",     // Curso
  "4": "bg-pink-950",     // Plática
  "5": "bg-teal-800",     // Reunión
  "6": "bg-slate-700",   // Ceremonia
  "7": "bg-neutral-700", // Diálogos Transparentes
  "8": "bg-blue-950",     // Otro
}

const comisiones = [
  "Capacitación Electoral.",
  "Consejo General.",
  "Consejo General POPJL.",
  "Adquisiciones.",
  "Ética y Conducta.",
  "Temporal de Debates.",
  "Educación Cívica y Participación Ciudadana.",
  "Fiscalización.",
  "Organización Electoral.",
  "Paridad de Género, Igualdad y No Discriminación.",
  "Partidos Políticos y Agrupaciones Políticas.",
  "Quejas y Denuncias.",
  "Radiodifusión y Comunicación Política.",
  "Reglamentos y Normatividad.",
  "Seguimiento del Servicio Profesional Electoral Nacional.",
  "Seguimiento y Revisión del Ejercicio Presupuestal.",
  "Técnico del Fondo del Fideicomiso de Infraestructura.",
  "Técnico del Fondo del Fideicomiso de Pasivo Laboral.",
  "Tecnologías e Innovación.",
  "Transparencia y Acceso a la Información y de Archivos.",
  "Vinculación con el INE.",
  "Transparencia."
]

const site = [
  { id: 1, name: "Sala de Consejo General" },
  { id: 2, name: "Sala de Presidentes" },
  { id: 3, name: "Estacionamiento Principal" },
  { id: 4, name: "Lobby" },
  { id: 5, name: "Lugar Externo" },
  { id: 6, name: "Otro" },
  { id: 7, name: "Ninguno" }
]

const scope = [
  { id: 1, name: "Virtual" },
  { id: 2, name: "Presencial" },
  { id: 3, name: "Híbrido" }
]

const consecutivo = [
  "Ext.",
  "Ord.",
  "Esp."
]

const preposiciones: Record<string, string> = {
  "Capacitación Electoral.": "de la Comisión de",
  "Consejo General.": "del",
  "Consejo General POPJL.": "del",
  "Adquisiciones.": "del Comité de",
  "Ética y Conducta.": "de la Comisión de",
  "Temporal de Debates.": "de la Comisión",
  "Educación Cívica y Participación Ciudadana.": "de la Comisión de",
  "Fiscalización.": "de la Comisión de", 
  "Organización Electoral.": "de la Comisión de",
  "Paridad de Género, Igualdad y No Discriminación.": "de la Comisión de",
  "Partidos Políticos y Agrupaciones Políticas.": "de la Comisión de",
  "Quejas y Denuncias": "de la Comisión de.",
  "Radiodifusión y Comunicación Política.": "de la Comisión de",
  "Reglamentos y Normatividad.": "de la Comisión de",
  "Seguimiento del Servicio Profesional Electoral Nacional.": "de la Comisión de",
  "Seguimiento y Revisión del Ejercicio Presupuestal.": "de la Comisión de",
  "Técnico del Fondo del Fideicomiso de Insfraestructura.": "de la Comisión de",
  "Técnico de Fondo del Fideicomiso de Pasivo Laboral.": "de la Comisión de",
  "Tecnologías e Innovación.": "de la Comisión de",
  "Transparencia y Acceso a la Información y de Archivos.": "de la Comisión de",
  "Vinculación con el INE.": "de la Comisión de",
  "Transparencia": "del Comité de"
}

// const mockUser = {
//   id: 1,
//   name: "Alondra Gutiérrez Flores",
//   email: "alondra.gutierrez",
//   area: {
//     id: 3,
//     name: "Dirección",
//     acronym: "DO",
//     email: "dir.orga",
//     image: "https://liga/a/imagen.png"
//   }
// }


function combineDateTime(date: Date | undefined, time: string): string {
  return dayjs(date).format("YYYY-MM-DD") + " " + time + ":00"
}

React.useEffect(() => {
  if (newTipo === "1") {
    let titulo = "Sesión"

    if (newConsecutivo) titulo += ` ${newConsecutivo}`
    if (newConsecutiva) titulo += ` ${newConsecutiva}`

    if (selectedComision) {
      const prep = preposiciones[selectedComision] || "de"
      titulo += ` ${prep} ${selectedComision}`
    }

    setNewTitle(titulo.trim().replace(/\s+/g, " "))
  }
}, [newTipo, newConsecutivo, newConsecutiva, selectedComision])


  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  React.useEffect(() => {
    if (isMobile) {
      const el = document.getElementById(`day-${today.date()}`)
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [isMobile, month, year])

  const startOfMonth = dayjs(new Date(year, month, 1))
  const daysInMonth = startOfMonth.daysInMonth()
  const firstDay = startOfMonth.day()

  const GridCalendar = () => {
    const days = []
    const totalCells = 36

    for (let i = 0; i < totalCells; i++) {
      const day = i - firstDay + 1
      const currentDate = dayjs(new Date(year, month, day)).format("YYYY-MM-DD")
      const isToday = dayjs().isSame(currentDate, "day")
      const eventList = events.filter((e) => e.date === currentDate)

      days.push(
        <div
          key={i}
          className={`dark:border-neutral-800 text-md rounded-sm flex flex-col overflow-hidden min-h-[150px] max-h-[100px] transition-colors
            ${day > 0 && day <= daysInMonth ? "bg-white dark:bg-neutral-950 hover:bg-gray-100 dark:hover:bg-neutral-950" : "bg-gray-100 dark:bg-neutral-800"}`}

        >
          
          {day > 0 && day <= daysInMonth && (
            <>
              <div
                className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full m-1
                ${isToday
                    ? "bg-rose-700 text-white dark:bg-white dark:text-black"
                    : "text-gray-700 dark:text-gray-300"
                  }`}
              >
                {day}
              </div>
              <div className="flex-1 overflow-hidden px-1 pb-1">
                <div className="space-y-[2px] h-[110px] overflow-y-auto pr-1">
                  {eventList.map((e, idx) => (
                    <div
                        key={idx}
                          className={`text-white text-xs rounded-md px-2 py-1 shadow-sm cursor-pointer hover:opacity-90 transition truncate ${
                            tipoColorMap[e.type || "8"]
                          }`}
                        onClick={() => setSelectedEvent(e)}
                      >
                      <div className="flex items-center gap-1">
                        {e.tipo === "Privado" ? (
                          <IconLock className="h-3.5 w-3.5 text-white dark:text-white shrink-0" />
                        ) : (
                          <IconWorld className="h-3.5 w-3.5 text-white dark:text-white shrink-0" />
                        )}
                        <span className="truncate">{e.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-7 mb-4 bg-gray-100 dark:bg-neutral-800 text-center text-xs sm:text-sm font-bold border-y rounded-xl dark:border-neutral-800">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
            <div key={d} className="p-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-auto gap-1">{days}</div>
      </>
    )
  }

  const MobileAgendaView = () => {
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    return (
      <div className="overflow-x-auto">
        <div className="space-y-2 min-w-max px-1">
          {daysArray.map((day) => {
            const currentDate = dayjs(new Date(year, month, day))
            const formattedDate = currentDate.format("YYYY-MM-DD")
            const dailyEvents = events.filter((e) => e.date === formattedDate)
            const isToday = currentDate.isSame(today, "day")

            return (
              <div
                key={day}
                id={`day-${day}`}
                className="bg-white dark:bg-neutral-950 p-2 border-sm scroll-mt-16 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800 w-full"
              >
                <div
                  className={`font-bold text-sm mb-2 rounded-md px-2 py-1 w-full
                  ${isToday ? "bg-neutral-900 text-white" : "text-gray-800 dark:text-gray-200"}`}
                >
                  {currentDate.format("dddd D [de] MMMM")}
                </div>

                {dailyEvents.length > 0 ? (
                  <ul className="space-y-1 mt-2 min-w-max">
                    {dailyEvents.map((e, idx) => (
                      <li
                        key={idx}
                          className={`flex items-center gap-2 text-white text-sm rounded-md px-2 py-1 cursor-pointer whitespace-nowrap 
                          ${tipoColorMap[e.type || "8"] || "bg-gray-500"}`}

                        onClick={() => setSelectedEvent(e)}
                      >
                        {e.tipo === "Privado" ? (
                          <IconLock className="w-3.5 h-3.5 text-black dark:text-white" />
                        ) : (
                          <IconWorld className="w-3.5 h-3.5 text-black dark:text-white" />
                        )}
                        <span>{e.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-400 dark:text-gray-500">Sin eventos</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-2 box-border bg-gray-50 dark:bg-neutral-950">
      <div className="flex items-center justify-between px-2 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Agenda Institucional</h1>

        {/* Escritorio: botones */}
        <div className="hidden sm:flex gap-2">
          <Button variant="outline" size="sm" className="bg-white text-gray-900 dark:bg-transparent dark:text-white border border-gray-300 dark:border-gray-700">
            Exportar
          </Button>
          <Button
            size="sm"
            className="bg-neutral-600 text-white dark:bg-neutral-600 dark:text-white"
            onClick={() => setOpenNewEventModal(true)}
          >
            Nuevo evento
          </Button>
        </div>
        <div className="sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconDotsVertical className="w-5 h-5 text-gray-700 dark:text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-2 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <div className="cursor-pointer hover:underline">Exportar</div>
             <div
                className="cursor-pointer hover:underline"
                onClick={() => setOpenNewEventModal(true)}
              >
                Nuevo evento
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 mb-5">
        <IconChevronLeft
          className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-black cursor-pointer"
          onClick={() => {
            if (month === 0) {
              setMonth(11)
              setYear((prev) => prev - 1)
            } else {
              setMonth((prev) => prev - 1)
            }
          }}
        />
        <div className="flex items-center rounded-full overflow-hidden text-sm font-bold divide-x dark:border-gray-600">
          <div className="px-3 py-1 bg-white dark:bg-neutral-800 text-muted-foreground select-none dark:text-gray-200">
            {dayjs(new Date(year, month)).format("MMM YYYY").toUpperCase()}
          </div>
          {(month !== today.month() || year !== today.year()) && (
            <Button
              variant="ghost"
              className="px-3 py-1 flex items-center gap-2 h-auto text-sm font-medium"
              onClick={() => {
                setMonth(today.month())
                setYear(today.year())
              }}
            >
              <IconArrowBack className="w-4 h-4" /> Hoy
            </Button>
          )}
        </div>
        <IconChevronRight
          className="w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-black cursor-pointer"
          onClick={() => {
            if (month === 11) {
              setMonth(0)
              setYear((prev) => prev + 1)
            } else {
              setMonth((prev) => prev + 1)
            }
          }}
        />
      </div>

      {isMobile ? <MobileAgendaView /> : <GridCalendar />}

             <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
              <DialogContent className="max-w-xl rounded-xl border border-neutral-300 bg-white dark:border-neutral-900 dark:bg-neutral-900 shadow-lg">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-center w-full text-xl font-semibold dark:text-white">
                    {selectedEvent?.title}
                    <p className="text-sm text-neutral-500 dark:text-gray-300 mt-1 font-normal">
                      Tipo: {tiposDeEvento.find((t) => t.id === Number(selectedEvent?.type))?.name || "No especificado"}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-gray-400 mt-1">
                        Modalidad: {scope.find((s) => s.id === Number(selectedEvent?.scope))?.name || "No especificada"}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-gray-400 mt-1">
                        Área: {selectedEvent?.user?.area?.name || "No especificada"}
                        </p>
                  </DialogTitle>
             </DialogHeader>

          {/* Contenido principal */}
          <div className="w-full p-2 rounded-md text-sm text-neutral-800 dark:text-gray-200 space-y-6">
            <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-2">
              <div className="flex items-center gap-2">
                <IconUsers className="w-5 h-5" />
                <span className="font-medium">
                  {selectedEvent?.user?.name || "Sin responsable"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedEvent?.tipo === "Privado" ? (
                  <IconLock className="w-5 h-5 text-red-500" />
                ) : (
                  <IconWorld className="w-5 h-5" />
                )}
                <span className="text-sm">{selectedEvent?.tipo || "Público"}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <IconCalendarEvent className="w-5 h-5" />
                <span>
                  Inicio: {selectedEvent?.date && selectedEvent?.start
                    ? dayjs(selectedEvent.date).format("DD [de] MMMM [de] YYYY") + ` a las ${selectedEvent.start}`
                    : "No especificado"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalendarEvent className="w-5 h-5" />
                <span>
                  Fin: {selectedEvent?.date && selectedEvent?.end
                    ? dayjs(selectedEvent.date).format("DD [de] MMMM [de] YYYY") + ` a las ${selectedEvent.end}`
                    : "No especificado"}
                </span>
              </div>
            </div>

            {selectedEvent?.scope !== "1" && (
              <div className="flex items-center gap-1">
                <IconMapPin className="w-5 h-5" />
              <span>
                Lugar: {site.find((l) => l.id === Number(selectedEvent?.site))?.name || "No especificado"}
              </span>
              </div>
            )}
          </div>

           <div className="flex justify-center gap-3 mt-6 pt-4 border-t dark:border-neutral-700">

            <Button
            onClick={() => {
              if (!selectedEvent) return
              const index = events.findIndex(e => e === selectedEvent)
              setEditingIndex(index)
              setNewTitle(selectedEvent.title)
              setNewResponsable(selectedEvent.user?.name || "")
              setSelectedSite(selectedEvent.site || "")
              setStartDate(dayjs(selectedEvent.date).toDate())
              setEndDate(dayjs(selectedEvent.date).toDate()) 
              setIsPrivate(selectedEvent.tipo === "Privado")
              setNewTipo(selectedEvent.type || "")
              setNewScope(selectedEvent.scope || "")
              setNewConsecutiva(selectedEvent.consecutiva || undefined)
              setNewConsecutivo(selectedEvent.consecutivo || "")
              setSelectedEvent(null)
              setOpenNewEventModal(true)
            }}

               className="flex items-center gap-2 rounded-md px-3 py-2"
              >
                <IconEdit size={18} />
                  Editar
                </Button>
                  {/* Botón Eliminar */}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (!selectedEvent) return
                      const filtered = events.filter(e => e !== selectedEvent)
                      setEvents(filtered)
                      setSelectedEvent(null)
                    }}
                    className="flex items-center gap-2 rounded-md px-4 py-2"
                  >
                    <IconTrash size={18} />
                    Eliminar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>


              <Dialog open={openNewEventModal} onOpenChange={setOpenNewEventModal}>
                <DialogContent 
                
                className="w-full max-w-[700px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] rounded-xl border border-neutral-300 bg-white dark:border-neutral-900 dark:bg-neutral-900 shadow-lg">
                  <DialogHeader className="text-center">
                    <DialogTitle className="text-center w-full text-xl font-semibold dark:text-white">
                      {selectedEvent ? "Editar evento" : "Crear nuevo evento"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Tipo de evento</label>
                        <Select value={newTipo} onValueChange={(value) => {
                          setNewTipo(value)
                          if (value === "1") {
                            setNewTitle("Sesión")
                          } else {
                            setNewTitle("")
                            setSelectedComision("")
                            }
                          }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar tipo de evento" />
                            </SelectTrigger>
                            <SelectContent>
                              {tiposDeEvento.map((type) => (
                                <SelectItem key={type.id} value={String(type.id)}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Scope */}
                        <div>
                          <label className="block mb-1">Modalidad</label>
                          <Select value={newScope} onValueChange={setNewScope}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccionar modalidad" />
                            </SelectTrigger>
                            <SelectContent>
                              {scope.map((s) => (
                              <SelectItem key={s.id} value={String(s.id)}>
                                  {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                        
                      {newTipo === "1" && (
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                          {/* Tipo de Sesión */}
                          <div className="w-full sm:w-1/3">
                            <label className="block mb-1">Tipo de Sesión</label>
                            <Select value={newConsecutivo} onValueChange={setNewConsecutivo}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar tipo de sesión" />
                              </SelectTrigger>
                              <SelectContent>
                                {consecutivo.map((c, index) => (
                                  <SelectItem key={index} value={c}>
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Consecutiva */}
                          <div className="w-full sm:w-1/3">
                            <label className="block mb-1">Consecutiva</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={newConsecutiva ?? ""}
                              onChange={(e) => {
                                const value = e.target.value
                                const parsed = Number(value)
                                if (
                                  value === "" ||
                                  (/^\d{1,2}$/.test(value) && parsed >= 1 && parsed <= 99)
                                ) {
                                  setNewConsecutiva(value === "" ? undefined : parsed)
                                }
                              }}
                              className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>

                          {/* Comisión (filtrada si el tipo de sesión es Esp.) */}
                          <div className="w-full sm:w-1/3">
                            <label className="block mb-1">Comisión</label>
                            <Select
                              value={selectedComision}
                              onValueChange={(value) => {
                                setSelectedComision(value)
                                setNewTitle(`Sesión - ${value}`)
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar comisión" />
                              </SelectTrigger>
                              <SelectContent>
                                {comisiones
                                  .filter((comision) => {
                                    if (newConsecutivo === "Esp.") {
                                      return (
                                        comision === "Consejo General." ||
                                        comision === "Consejo General POPJL."
                                      )
                                    }
                                    return true
                                  })
                                  .map((comision, index) => (
                                    <SelectItem key={index} value={comision}>
                                      {`${index + 1}. ${comision}`}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                <div className="w-full p-2 rounded-md text-sm text-neutral-800 dark:text-gray-200 space-y-6">
                  <div>
                      <label className="block mb-1">Título</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Título"
                        className={`w-full p-2 rounded-md border ${
                          newTipo === "Sesión" ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                        }`}
                        disabled={newTipo === "1"}
                      />
                    </div>
                  <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">¿Evento privado?</label>
                  <Switch
                    checked={isPrivate}
                    onCheckedChange={setIsPrivate}
                  />
                </div>
                   <div className="w-full">
                    <label className="block mb-2">Lugar</label>
                    <Select
                      onValueChange={(val) => setNewLugar(val)}
                      value={newLugar}
                      disabled={newScope === "1"}
                    >
                      <SelectTrigger className={newScope === "Virtual" ? "bg-gray-100 cursor-not-allowed" : ""}>
                        <SelectValue placeholder={newScope === "Virtual" ? "No aplica" : "Selecciona un lugar"} />
                      </SelectTrigger>
                      <SelectContent>
                        {site.map((l) => (
                          <SelectItem key={l.id} value={String(l.id)}>
                            {l.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Fecha Inicio */}
                      <div className="flex flex-col">
                        <label className="block mb-1">Fecha de Inicio</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className="w-full text-left p-2 border rounded-md bg-white dark:bg-neutral-800 text-black dark:text-white border-neutral-300 dark:border-neutral-700"
                            >
                              {startDate
                                ? format(startDate, "dd 'de' MMMM 'de' yyyy", { locale: es })
                                : "Seleccionar fecha"}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              locale={es}
                              selected={startDate}
                              onSelect={setStartDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Hora Inicio */}
                      <div className="flex flex-col">
                        <label className="block mb-1">Hora de Inicio</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full p-2 rounded-md border dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white"
                        />
                      </div>
                   {/* Fecha Fin */}
                  <div className="flex flex-col">
                    <label className="block mb-1">Fecha de Fin</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="w-full text-left p-2 border rounded-md bg-white dark:bg-neutral-800 text-black dark:text-white border-neutral-300 dark:border-neutral-700"
                        >
                          {endDate
                            ? format(endDate, "dd 'de' MMMM 'de' yyyy", { locale: es })
                            : "Seleccionar fecha"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={es}
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Hora Fin */}
                  <div className="flex flex-col">
                    <label className="block mb-1">Hora de Fin</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full p-2 rounded-md border dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white"
                    />
                  </div>
                </div>

                  <div className="flex justify-center pt-2">
                      <Button
                        size="sm"
                        className="bg-neutral-600 text-white"
                        onClick={async () => {
                          if (!newTitle || !startDate || !startTime || !endDate || !endTime) {
                            alert("Por favor completa todos los campos obligatorios.")
                            return
                          }

                          const payload = {
                            title: newTitle,
                            start: combineDateTime(startDate, startTime),
                            end: combineDateTime(endDate, endTime), 
                            type: tiposDeEvento.find((t) => t.id === Number(newTipo)),
                            scope: scope.find((s) => s.id === Number(newScope)),
                            site: site.find((l) => l.id === Number(newLugar)),
                          }

                          try {
                            if (editingIndex !== null) {
                              const eventToEdit = events[editingIndex]
                              const response = await axios.put(`/api/events/${eventToEdit.id}`, payload)

                            setEvents((prev: CalendarEvent[]) => {
                            const updated = [...prev]
                            updated[editingIndex] = response.data as CalendarEvent
                            return updated
                          })
                              setEditingIndex(null)
                              console.log("Evento actualizado:", response.data)
                            } else {
                              const response = await axios.post("/api/events/", payload)
                             setEvents((prev: CalendarEvent[]) => [...prev, response.data as CalendarEvent])
                              console.log("Evento creado:", response.data)
                            }

                            setOpenNewEventModal(false)

                            setNewTitle("")
                            setNewResponsable("")
                            setSelectedSite("")
                            setStartDate(new Date())
                            setEndDate(new Date())
                            setStartTime("09:00")
                            setEndTime("10:00")
                            setSelectedComision("")
                            setNewTipo("")
                            setNewScope("")
                            setNewConsecutiva(undefined)
                            setNewConsecutivo("")
                          } catch (error) {
                            console.error("Error al guardar evento:", error)
                          }
                        }}
                      >
                        Guardar
                      </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
         </div>
       )
    }