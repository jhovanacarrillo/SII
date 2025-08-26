
"use client"

import React, { useEffect, useState } from "react"
import CustomCalendar from "@/components/ui/CustomCalendar"
import axios from "axios"

interface ApiEvent {
  id: number
  title: string
  start: string
  end: string
  user: {
    id: number
    name: string
    email: string
    area: {
      id: number
      name: string
      acronym: string
      email: string
      image: string
    }
  }
  type: {
    id: number
    name: string
    color: string
  }
  scope: {
    id: number
    name: string
  }
  site: {
    id: number
    name: string
  }
}

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
