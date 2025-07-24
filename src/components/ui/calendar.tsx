"use client"

import React from "react"
import dayjs from "dayjs"
import "dayjs/locale/es"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CalendarDays,
  MapPin,
  Clock,
  Lock,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarEvent {
  date: string
  title: string
  description?: string
  responsable?: string
  lugar?: string
  hora_inicio?: string
  hora_fin?: string
  tipo?: string
  area?: string
}

interface Props {
  events?: CalendarEvent[]
  isSidebarOpen?: boolean
}

dayjs.locale("es")

export default function CustomCalendar({ events = [], isSidebarOpen = false }: Props) {
  const today = dayjs()

  const [month, setMonth] = React.useState(today.month())
  const [year, setYear] = React.useState(today.year())
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [isMobile, setIsMobile] = React.useState(false)

  const shouldHideCalendar = isMobile && isSidebarOpen

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll al día actual cuando el sidebar se cierra
  React.useEffect(() => {
    if (!shouldHideCalendar && isMobile) {
      const el = document.getElementById(`day-${today.date()}`)
      el?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [shouldHideCalendar, isMobile, month, year])

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
          className={`border p-2 text-sm bg-white rounded flex flex-col overflow-hidden min-h-[100px] ${
            day > 0 && day <= daysInMonth ? "" : "bg-gray-100"
          }`}
        >
          {day > 0 && day <= daysInMonth && (
            <>
              <div
                className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday ? "bg-gray-700  text-white" : ""
                }`}
              >
                {day}
              </div>

              <div className="mt-1 flex-1 overflow-y-auto space-y-[2px]">
                {eventList.map((e, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-500 text-white text-xs rounded px-1 py-[2px] cursor-pointer hover:bg-gray-600 transition truncate"
                    onClick={() => setSelectedEvent(e)}
                    title={e.title}
                  >
                    {e.title}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-7 mb-3 bg-gray-100 text-center text-xs sm:text-sm font-bold border-y rounded-t-md">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
            <div key={d} className="p-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-auto gap-[1px]">{days}</div>
      </>
    )
  }

  const MobileAgendaView = () => {
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    return (
      <div className="space-y-4">
        {daysArray.map((day) => {
          const currentDate = dayjs(new Date(year, month, day))
          const formattedDate = currentDate.format("YYYY-MM-DD")
          const dailyEvents = events.filter((e) => e.date === formattedDate)
          const isToday = currentDate.isSame(today, "day")

          return (
            <div
              key={day}
              id={`day-${day}`}
              className="bg-white p-4 rounded shadow scroll-mt-16"
            >
              <div
                className={`font-semibold text-sm mb-2 rounded px-2 py-1 w-fit ${
                  isToday ? "bg-gray-600 text-white" : ""
                }`}
              >
                {currentDate.format("dddd D [de] MMMM")}
              </div>

              {dailyEvents.length > 0 ? (
                dailyEvents.map((e, idx) => (
                  <div
                    key={idx}
                    className="text-sm text-gray-600 underline cursor-pointer"
                    onClick={() => setSelectedEvent(e)}
                  >
                    {e.title}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">Sin eventos</div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full px-2 sm:px-4 py-2 box-border">
      {shouldHideCalendar ? (
        <div className="w-full text-center mt-20 text-gray-500 text-sm">
          Cierra el menú lateral para ver el calendario
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-2 mb-5">
            <ChevronLeft
              className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
              onClick={() => {
                if (month === 0) {
                  setMonth(11)
                  setYear((prev) => prev - 1)
                } else {
                  setMonth((prev) => prev - 1)
                }
              }}
            />

            <div className="flex items-center rounded-full border overflow-hidden text-sm font-bold divide-x">
              <div className="px-3 py-1 bg-white text-muted-foreground select-none">
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
                  <RotateCcw className="w-4 h-4" /> Hoy
                </Button>
              )}
            </div>

            <ChevronRight
              className="w-5 h-5 text-gray-800 hover:text-black cursor-pointer"
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
        </>
      )}

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-xl rounded-xl border-2 border-white-600 shadow-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-center w-full text-xl font-semibold">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="w-full bg-white p-2 rounded-md text-sm text-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  {selectedEvent?.responsable || "Sin responsable"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedEvent?.tipo === "Privado" ? (
                  <Lock className="w-4 h-4 text-red-500" />
                ) : (
                  <Globe className="w-4 h-4" />
                )}
                <span className="text-sm">{selectedEvent?.tipo || "Público"}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>
                  Fecha inicio:{" "}
                  {selectedEvent?.date
                    ? dayjs(selectedEvent.date).format("DD [de] MMMM [de] YYYY")
                    : "Sin fecha"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>
                  Fecha fin:{" "}
                  {selectedEvent?.date
                    ? dayjs(selectedEvent.date).format("DD [de] MMMM [de] YYYY")
                    : "Sin fecha"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Lugar: {selectedEvent?.lugar || "No especificado"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  Hora:{" "}
                  {selectedEvent?.hora_inicio && selectedEvent?.hora_fin
                    ? `${selectedEvent.hora_inicio} a ${selectedEvent.hora_fin}`
                    : "No especificada"}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
