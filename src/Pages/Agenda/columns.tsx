"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {  FileText,SquarePen } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Agenda = {
  id: string
  clave: number,
  imagen: string,
  nombre_completo: string,
  area:string,
  puesto:string,
  extensión:string,
  status: "pending" | "processing" | "success" | "failed",
  email: string
}

export const columns: ColumnDef<Agenda>[] = [
  {
    accessorKey: "clave",
    header: () => (
    <div className="text-center text-cyan-700 font-semibol">Clave</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("clave")}</div>
  ),
  },

   {
    accessorKey: "imagen",
     header: () => (
    <div className="text-center text-cyan-700 font-semibold">Imagen</div>
  ),
   cell: ({ row }) => (
    <div className="text-center">{row.getValue("imagen")}</div>
  ),
  },

  
   {
  accessorKey: "nombre_completo",
  header: () => (
    <div className="text-center text-cyan-700 font-semibold">Nombre Completo</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("nombre_completo")}</div>
  ),
},

 

   {
    accessorKey: "area",
     header: () => (
    <div className="text-center text-cyan-700 font-semibold">Área</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("area")}</div>
  ),
  },
     {
    accessorKey: "puesto",
    header: () => (
    <div className="text-center text-cyan-700 font-semibold">Puesto</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("puesto")}</div>
  ),
  },

       {
    accessorKey: "email",
    header: () => (
    <div className="text-center text-cyan-700 font-semibold">Correo Electrónico</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("email")}</div>
  ),
  },

     {
    accessorKey: "extensión",
    header: () => (
    <div className="text-center text-cyan-700 font-semibold">Extensión</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("extensión")}</div>
  ),
  },

       {
    accessorKey: "estado",
     header: () => (
    <div className="text-center text-cyan-700 font-semibold">Estado</div>
  ),
  },

  

  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    cell: () => {
      //const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
  
  <DropdownMenuItem className="gap-2">
    <FileText className="w-4 h-4" />
    Documento
  </DropdownMenuItem>

  <DropdownMenuItem className="gap-2">
    <SquarePen className="w-4 h-4" />
    Editar
  </DropdownMenuItem>

  <DropdownMenuSeparator />
 
</DropdownMenuContent>

        </DropdownMenu>
      )
    },
  },
]
