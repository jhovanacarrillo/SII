
"use client"

import type { ColumnDef } from "@tanstack/react-table"
//import { IconUserSquare } from '@tabler/icons-react';
import { IconCircleCheck, IconCircleX} from '@tabler/icons-react';
import { ActionsCell } from "./Actions";
import { DialogCell } from "./Dialog";


// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog"



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


//const isMobile = window.innerWidth < 768;

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
    <img src="../../../public/img/user3.jpeg" alt="usuario" className="w-10 h-10 rounded-full bg-white object-cover border border-gray-300"/>
   </div>
  ),
  },



// {
//   accessorKey: "nombre_completo",
//   header: () => ( <div className="text-center text-cyan-700 dark:text-white font-bold">Nombre Completo</div>
//   ),
//   cell: ({ row }) => {
   
  
//     const nombre = row.getValue("nombre_completo") as string
//     const {area,puesto} = row.original
//     return (
//       <div className="flex items-center justify-center gap-2">
//         <span>{nombre}</span>

//         <Dialog>
//           <DialogTrigger asChild>
//             <button className="text-muted-foreground hover:text-primary transition-colors">
//               <IconUserSquare stroke={2} className="w-5 h-5 dark:text-neutral-300" />
//             </button>
//           </DialogTrigger>
//           <DialogContent className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 [&>button]:text-gray-800 dark:[&>button]:text-white"
// >
   
//             <DialogHeader>
//               <DialogTitle>Información del usuario</DialogTitle>
//              <DialogDescription>
//                 <div className="flex items-center gap-4 mt-4">
//                   <img
//                     className="w-26 h-26 rounded-full"
//                     src="../../../public/img/user3.jpeg"
//                     alt="Usuario"
//                   />
//                   <div className="flex flex-col">
//                     <p className="text-lg font-medium dark:text-neutral-100">{nombre}</p>
//                     <p className="text-sm text-muted-foreground">{area}</p>
//                     <p className="text-sm text-muted-foreground"> {puesto}</p>

  

//                     <div className="flex mt-2 gap-1">
//   {[...Array(5)].map((_, index) => (
//     <img
//       key={index}
//       src="../../../public/img/insignia2.png"
//       alt="Insignia"
//       className="w-8 h-8 object-contain"
//     />
//   ))}
// </div>

//                   </div>
//                 </div>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       </div>
//     )
//   },
// },

// {
//   accessorKey: "nombre_completo",
//   header: () => (
//     <div className="text-center text-cyan-700 dark:text-white font-bold">Nombre Completo</div>
//   ),
//   cell: ({ row }) => {
//     const nombre = row.getValue("nombre_completo") as string;
//     const { area, puesto } = row.original;

//     return (
//       <Dialog>
//         <DialogTrigger asChild>
//           <div className="flex items-center justify-center gap-2 cursor-pointer hover:underline">
//             <span>{nombre}</span>
//           </div>
//         </DialogTrigger>

//         <DialogContent className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 [&>button]:text-gray-800 dark:[&>button]:text-white">
//           <DialogHeader>
//             <DialogTitle>Información del usuario</DialogTitle>
//             <DialogDescription>
//               <div className="flex items-center gap-4 mt-4">
//                 <img
//                   className="w-26 h-26 rounded-full"
//                   src="../../../public/img/user3.jpeg"
//                   alt="Usuario"
//                 />
//                 <div className="flex flex-col">
//                   <p className="text-lg font-medium dark:text-neutral-100">{nombre}</p>
//                   <p className="text-sm text-muted-foreground">{area}</p>
//                   <p className="text-sm text-muted-foreground">{puesto}</p>
//                   <div className="flex mt-2 gap-1">
//                     {[...Array(5)].map((_, index) => (
//                       <img
//                         key={index}
//                         src="../../../public/img/insignia2.png"
//                         alt="Insignia"
//                         className="w-8 h-8 object-contain"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     );
//   },
// },

{
  accessorKey: "nombre_completo",
  header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Nombre Completo</div>
  ),
  cell: ({ row }) => {
    const { nombre_completo, area, puesto, email } = row.original;
    return (
      <DialogCell
        triggerContent={<span>{nombre_completo}</span>}
        nombre={nombre_completo}
        area={area}
        puesto={puesto}
        email={email}
      />
    );
  },
},

 

//    {
//     accessorKey: "area",
//      header: () => (
//     <div className="text-center text-cyan-700 dark:text-white font-bold">Área</div>
//   ),
//   cell: ({ row }) => (
//     <div className="text-center">{row.getValue("area")}</div>
//   ),
//   },

 {
  accessorKey: "area",
  header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Área</div>
  ),
  cell: ({row}) => {
    const{ nombre_completo, area, puesto, email} = row.original;
    return(
      <DialogCell
        triggerContent={<span>{area}</span>}
        nombre={nombre_completo}
        area={area}
        puesto={puesto}
        email={email}

      />
    );
  },
},



     {
    accessorKey: "puesto",
    header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Puesto</div>
  ),
    cell: ({ row }) => {
    const { nombre_completo, area, puesto, email } = row.original;
    return (
      <DialogCell
        triggerContent={<span>{puesto}</span>}
        nombre={nombre_completo}
        area={area}
        puesto={puesto}
        email={email}

      />
    );
  },
},

       {
    accessorKey: "email",
    header: () => (
    <div className="text-center text-cyan-700 dark:text-white font-bold">Correo Electrónico</div>
  ),
  cell: ({ row }) => {
    const { nombre_completo, area, puesto, email } = row.original;
    return (
      <DialogCell
        triggerContent={<span>{email}</span>}
        nombre={nombre_completo}
        area={area}
        puesto={puesto}
        email={email}

      />
    );
  },
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
          <IconCircleCheck stroke={2} className="w-5 h-5 text-green-600"></IconCircleCheck>
        ): (
          <IconCircleX stroke={2} className="w-5 h-5 text-red-600"></IconCircleX>
        )}

       </div>
    )
  },
   meta: {ocultable: true},
  },


//   {
//   id: "actions",
//   cell: ({ row }) => {
//     const user = row.original; 
//     return <ActionsCell userId={user.id} />; 
//   },
// },


   {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const usuario = row.original;
      //return <ActionsCell usuario={usuario} />;
       return <ActionsCell usuario={usuario}  />;
    },
  },

]
