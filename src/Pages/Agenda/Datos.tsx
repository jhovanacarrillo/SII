"use client";

import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import axios from "axios";

import {
  IconSearch,
  IconCopy,
  IconUserPlus,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
//import { IconClipboardText, IconEdit } from "@tabler/icons-react";
import type { Agenda } from "./columns";
import { ActionsCell } from "./Actions";
//import { IconTrashX } from "@tabler/icons-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);
  const [mostrarOpcionales, setMostrarOpcionales] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);
  const [openNuevoUsuario, setOpenNuevoUsuario] = React.useState(false);



  const [nombre, setNombre] = React.useState("");
  const [apellidoPaterno, setApellidoPaterno] = React.useState("");
  const [apellidoMaterno, setApellidoMaterno] = React.useState("");
  const [fechaNacimiento, setFechaNacimiento] = React.useState("");
  const [puestoSeleccionado, setPuestoSeleccionado] = React.useState("");
  const [areaSeleccionada, setAreaSeleccionada] = React.useState("");
  const [fechaInicio, setFechaInicio] = React.useState("");
  const [fechaFin, setFechaFin] = React.useState("");
  const [correoAuto, setCorreoAuto] = React.useState("");

  const handleNuevoUsuarioSubmit = async () => {
    const payload = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      correo: correoAuto ? `${correoAuto}@iepcdurango.mx` : "",
      puesto: puestoSeleccionado,
      area: areaSeleccionada,
      fechaInicio,
      fechaFin,
    };

    try {
      console.log("Datos a enviar:", payload);
      const response = await axios.post("/api/usuarios", payload);
      console.log("Respuesta del servidor:", response.data);

      setOpenNuevoUsuario(false);

     
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setFechaNacimiento("");
      setPuestoSeleccionado("");
      setAreaSeleccionada("");
      setFechaInicio("");
      setFechaFin("");
      setCorreoAuto("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (nombre && apellidoPaterno) {
      const nombreCorreo = `${nombre
        .trim()
        .split(" ")[0]
        .toLowerCase()}.${apellidoPaterno.trim().toLowerCase()}`;
      setCorreoAuto(nombreCorreo);
    } else {
      setCorreoAuto("");
    }
  }, [nombre, apellidoPaterno]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnVisibility: mostrarOpcionales
        ? {}
        : Object.fromEntries(
            columns
              .filter((col) => col.meta?.ocultable)
              .map((col) => {
                const key =
                  "accessorKey" in col && typeof col.accessorKey === "string"
                    ? col.accessorKey
                    : col.id;
                return key ? [key, false] : null;
              })
              .filter(Boolean) as [string, false][]
          ),
    },
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6">
        <div className="bg-white px-4 py-3 rounded-md w-full shadow-sm dark:bg-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <IconSearch
                  stroke={2}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 dark:text-neutral-100"
                />
                <Input
                  placeholder="Buscar"
                  value={globalFilter}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-10 border-neutral-500 w-full dark:border-neutral-400"
                />
              </div>

              <Select
                onValueChange={(value) =>
                  setPageSize(value === "all" ? data.length : Number(value))
                }
              >
                <SelectTrigger className="w-full sm:w-[150px] border-gray-500 dark:text-neutral-100">
                  <SelectValue placeholder={`Mostrar: ${pageSize}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row gap-2 w-full sm:w-auto justify-end">
              <Dialog
                open={openNuevoUsuario}
                onOpenChange={setOpenNuevoUsuario}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                  >
                    <IconUserPlus stroke={3} className="mr-1" /> Nuevo Usuario
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl bg-white dark:bg-neutral-900 dark:text-neutral-100">
                  <DialogHeader>
                    <DialogTitle className="text-gray-700 dark:text-neutral-100">
                      Registrar Nuevo Usuario
                    </DialogTitle>
                    <DialogDescription>
                      Completa los datos para dar de alta un nuevo usuario.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleNuevoUsuarioSubmit();
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
                  >
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Nombre(s)
                      </label>
                      <Input
                        placeholder="Nombre"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Apellido Paterno
                      </label>
                      <Input
                        placeholder="Apellido Paterno"
                        required
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Apellido Materno
                      </label>
                      <Input
                        placeholder="Apellido Materno"
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Fecha de nacimiento
                      </label>
                      <Input
                        type="date"
                        required
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Correo Institucional
                      </label>
                      <Input
                        name="correo"
                        value={correoAuto ? `${correoAuto}@iepcdurango.mx` : ""}
                        readOnly
                        required
                        className="pr-28 bg-gray-100 cursor-not-allowed dark:bg-neutral-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Puesto
                      </label>
                      <Select onValueChange={setPuestoSeleccionado}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un puesto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analista">Analista</SelectItem>
                          <SelectItem value="jefe">Jefe de Área</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Área
                      </label>
                      <Select onValueChange={setAreaSeleccionada}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sistemas">Sistemas</SelectItem>
                          <SelectItem value="recursos-humanos">
                            Recursos Humanos
                          </SelectItem>
                          <SelectItem value="finanzas">Finanzas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Fecha de inicio del contrato
                      </label>
                      <Input
                        type="date"
                        required
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Fecha de finalización del contrato
                      </label>
                      <Input
                        type="date"
                        required
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-2 mt-4">
                      <Button
                        type="button"
                        onClick={() => setOpenNuevoUsuario(false)}
                        className="bg-gray-700 text-neutral-100 hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                      >
                        Guardar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                size="sm"
                className="flex-1 sm:flex-none bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
              >
                <IconCopy stroke={3} className="mr-1" /> Copiar Correos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="grid grid-cols-1 gap-6">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const data = row.original as Agenda;
              const isExpanded = expandedCard === row.id;

              const handleCardClick = () => {
                if (isExpanded) {
                  setOpenDialog(row.id);
                } else {
                  setExpandedCard(row.id);
                }
              };

              return (
                <Dialog
                  key={row.id}
                  open={openDialog === row.id}
                  onOpenChange={(open) => !open && setOpenDialog(null)}
                >
                  <DialogTrigger asChild>
                    <div
                      className={`cursor-pointer rounded-xl shadow-md overflow-hidden bg-white dark:bg-neutral-800 border transition-all duration-300 ${
                        isExpanded ? "max-h-[350px]" : "max-h-[80px]"
                      }`}
                      onClick={handleCardClick}
                    >
                      <div
                        className={`h-20 flex items-center justify-center text-white font-semibold text-lg ${
                          data.status === "activo"
                            ? "bg-gradient-to-l from-green-500 to-green-700"
                            : "bg-gradient-to-l from-red-500 to-red-700"
                        }`}
                      >
                        {data.nombre_completo}
                      </div>

                      <div
                        className={`transition-opacity duration-300 ${
                          isExpanded
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <div className="relative">
                          <img
                            src="/img/user3.jpeg"
                            alt={data.nombre_completo}
                            className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -top-5 object-cover"
                          />
                        </div>

                        <div className="pt-17 pb-4 px-4 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {data.puesto}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {data.area}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {data.email}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {data.extensión}
                          </p>
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                          <ActionsCell usuario={data} />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 [&>button]:text-gray-800 dark:[&>button]:text-white">
                    <DialogHeader>
                      <DialogTitle className="text-center sm:text-left">
                        Información del usuario
                      </DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-4">
                          <img
                            className="w-22 h-22 rounded-full border-2 border-gray-300 object-cover"
                            src="/img/user3.jpeg"
                            alt={data.nombre_completo}
                          />
                          <div className="flex flex-col text-center sm:text-left">
                            <p className="text-lg font-semibold">
                              {data.nombre_completo}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              {data.area}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              {data.puesto}
                            </p>
                            <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                              {[...Array(5)].map((_, index) => (
                                <img
                                  key={index}
                                  src="/img/insignia2.png"
                                  alt="Insignia"
                                  className="w-7 h-7 object-contain"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            })
          ) : (
            <p className="text-center py-4">
              Ningún Resultado Coincide con la Búsqueda.
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-md border bg-white dark:bg-neutral-800">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const isLast = index === headerGroup.headers.length - 1;
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div className="flex justify-center items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {isLast && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setMostrarOpcionales((prev) => !prev)
                                }
                              >
                                {mostrarOpcionales ? (
                                  <IconEyeOff stroke={3} className="w-5 h-5" />
                                ) : (
                                  <IconEye stroke={3} className="w-5 h-5" />
                                )}
                              </Button>
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Ningún Resultado Coincide con la Búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination>
        <PaginationContent className="flex gap-4 mt-8">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.getCanPreviousPage() && table.previousPage()}
              className={`rounded-md border px-3 py-2 transition-colors ${
                table.getCanPreviousPage()
                  ? "bg-white hover:bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white"
                  : "pointer-events-none opacity-50 bg-gray-200 text-gray-400 dark:bg-neutral-700 dark:text-neutral-500"
              }`}
            />
          </PaginationItem>

          {Array.from({ length: table.getPageCount() }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={table.getState().pagination.pageIndex === index}
                onClick={() => table.setPageIndex(index)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  table.getState().pagination.pageIndex === index
                    ? "bg-neutral-600 text-white hover:bg-neutral-700 dark:bg-neutral-500"
                    : "bg-white hover:bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                }`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.getCanNextPage() && table.nextPage()}
              className={`rounded-md border px-3 py-2 transition-colors ${
                table.getCanNextPage()
                  ? "bg-white hover:bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white"
                  : "pointer-events-none opacity-50 bg-gray-200 text-gray-400 dark:bg-neutral-700 dark:text-neutral-500"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
