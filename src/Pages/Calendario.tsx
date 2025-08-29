
"use client"

import React, { useEffect, useState } from "react"
import CustomCalendar from "@/components/ui/CustomCalendar"
//import axios from "axios"



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
  scope?: string
}

export default function CalendarioPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)


  //Evento estático
 useEffect(() => {
  const dummyData: CalendarEvent[] = [
    {
      date: "2025-08-08",
      title: "Reunión General",
      responsable: "Carlos",
      lugar: "Sala A",
      hora_inicio: "09:00",
      hora_fin: "10:30",
      tipo: "Público",
      area: "Dirección",
      description: "Reunión general institucional",
    },

  ]

  setEvents(dummyData)
  setLoading(false)
}, [])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Cargando calendario...
      </div>
    )
  }

return <CustomCalendar events={events} setEvents={setEvents} />


}
