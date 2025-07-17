// src/components/CustomCalendar.tsx
import React from "react"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"

import "dayjs/locale/es"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

dayjs.locale("es")

interface CalendarEvent {
  date: string
  title: string
  description?: string
}

interface Props {
  events?: CalendarEvent[]
}

export default function CustomCalendar({ events = [] }: Props) {
  const today = dayjs()

  const [month, setMonth] = React.useState(today.month()) 
  const [year, setYear] = React.useState(today.year())
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)

  const startOfMonth = dayjs(new Date(year, month, 1))
  const daysInMonth = startOfMonth.daysInMonth()
  const firstDay = startOfMonth.day()

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
        className="border h-34 p-2 text-sm overflow-hidden bg-white rounded-lg flex flex-col"
      >
        {day > 0 && day <= daysInMonth ? (
          <>
            <div
              className={`font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                isToday ? "bg-pink-700 text-white" : ""
              }`}
            >
              {day}
            </div>

            <div className="mt-1  flex-1 overflow-y-auto space-y-1 pr-1">
              {eventList.map((e, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 text-xs truncate rounded px-1.5 py-1 cursor-pointer hover:bg-gray-300 transition"
                  onClick={() => setSelectedEvent(e)}
                  title={e.title}
                >
                  {e.title}
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/*Dropdown*/}
              <div className="flex items-center justify-between px-2 mb-2">
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

              <div className="flex items-center gap-2">
                <select
                  className="rounded-md border px-2 py-1 text-sm shadow-sm cursor-pointer"
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>
                      {dayjs().month(i).format("MMMM")}
                    </option>
                  ))}
                </select>

                <select
                  className="rounded-md border px-2 py-1 text-sm shadow-sm cursor-pointer"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const y = today.year() - 2 + i
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    )
                  })}
                </select>
              </div>

              <ChevronRight
                className="w-5 h-5 text-gray-600 hover:text-gray cursor-pointer"
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



      {/*Days*/}
      <div className="grid grid-cols-7 bg-gray-100 text-center mb-2 font-bold text-sm border-b rounded-md gap-[5px]">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} className="p-2">
            {d}
          </div>
        ))}
      </div>

      {/*Cells*/}
      <div className="grid grid-cols-7 grid-rows-6 rounded-b-md gap-[5px]">
        {days}
      </div>

      {/*Modal*/}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Fecha: {selectedEvent?.date ? dayjs(selectedEvent.date).format("DD-MMM-YYYY") : "Sin fecha disponible"}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 text-sm">
            {selectedEvent?.description || "Sin descripción disponible"}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
