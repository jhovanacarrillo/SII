// src/App.tsx
//import React from "react"
import Calendario from "@/components/ui/calendar" 

const events = [
  { date: "2025-07-02", title: "Reunión de trabajo" },
  { date: "2025-07-10", title: "SESIÓN EXTRAORDINARIA" },
  { date: "2025-07-10", title: "Reunión de retroalimentación" },
  { date: "2025-07-04", title: "Capacitación para el consejo" },
  { date: "2025-07-07", title: "Mesa de consejeros" },
  { date: "2025-07-11", title: "Sesión ordinaria pública" },
  { date: "2025-07-15", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-16", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-17", title: "Sesión ordinaria No. 3" },
  { date: "2025-07-18", title: "Sesión ordinaria No. 3" }
]

function App() {
  return (
    <div className="p-8">
      <Calendario events={events} />
    </div>
  )
}

export default App
