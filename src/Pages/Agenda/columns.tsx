
"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Check, MoreHorizontal, X } from "lucide-react"
import {  FileText,SquarePen } from "lucide-react"
import { FileUser } from "lucide-react"




import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export type Agenda = {
  id: string
  clave: number,
  imagen: string,
  nombre_completo: string,
  area:string,
  puesto:string,
  extensión:string,
  status: "activo" | "inactivo",
  email: string
}

export const columns: ColumnDef<Agenda>[] = [
  {
    accessorKey: "clave",
    header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Clave</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("clave")}</div>
  ),
  meta: {ocultable: true},
  },

  {
    accessorKey: "imagen",
     header: () => (
    <div className="text-center text-cyan-700  dark:text-white font-bold">Imagen</div>
  ),
   cell: () => (
   <div className="flex justify-center">
    <img src="../../../public/img/user2.png" alt="usuario" className="w-10 h-10 rounded-full bg-white object-cover border border-gray-300"/>
   </div>
  ),
  },



{
  accessorKey: "nombre_completo",
  header: () => ( <div className="text-center text-cyan-700 dark:text-white font-bold">Nombre Completo</div>
  ),
  cell: ({ row }) => {
    //const nombre = row.getValue("nombre_completo")
    const nombre = row.getValue("nombre_completo") as string
    const {area,puesto} = row.original
    return (
      <div className="flex items-center justify-center gap-2">
        <span>{nombre}</span>

        <Dialog>
          <DialogTrigger asChild>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <FileUser className="w-5 h-5" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Información del usuario</DialogTitle>
             <DialogDescription>
                <div className="flex items-center gap-4 mt-4">
                  <img
                    className="w-24 h-24 rounded-full"
                    src="../../../public/img/user.png"
                    alt="Usuario"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-black">{nombre}</p>
                    <p className="text-sm text-muted-foreground">{area}</p>
                    <p className="text-sm text-muted-foreground"> {puesto}</p>

                    {/* <div className="flex mt-2 gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Medal key={index} className="w-4 h-4 text-gray-500 fill-gray-400" />
                      ))}
                    </div> */}


                    <div className="flex mt-2 gap-1">
  {[...Array(5)].map((_, index) => (
    <img
      key={index}
      src="../../../public/img/insignia2.png"
      alt="Insignia"
      className="w-8 h-8 object-contain"
    />
  ))}
</div>

                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
},

 

   {
    accessorKey: "area",
     header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Área</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("area")}</div>
  ),
  },
     {
    accessorKey: "puesto",
    header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Puesto</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("puesto")}</div>
  ),
  },

       {
    accessorKey: "email",
    header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Correo Electrónico</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("email")}</div>
  ),
  },

     {
    accessorKey: "extensión",
    header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Extensión</div>
  ),
  cell: ({ row }) => (
    <div className="text-center">{row.getValue("extensión")}</div>
  ),
  },

       {
    accessorKey: "status",
     header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Estado</div>
  ),
  cell: ({row}) => {
    const estado = row.getValue("status") as string

    const isActivo = estado === "activo"
   
    return(
       <div className="flex justify-center items-center gap-2">
        {isActivo ? (
          <Check className="w-5 h-5 text-green-600"></Check>
        ): (
          <X className="w-5 h-5 text-red-600"></X>
        )}

       </div>
    )
  },
   meta: {ocultable: true},
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