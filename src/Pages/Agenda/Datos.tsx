"use client"


import type { ColumnDef, SortingState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { Search, Copy } from 'lucide-react';
import { Plus } from 'lucide-react';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  //SelectGroup,
  //SelectLabel
} from "@/components/ui/select"

import {
 
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  //const table = useReactTable({
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pageSize, setPageSize] = React.useState(10)
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // )




  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), 
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    //onColumnFiltersChange: setColumnFilters,
    //getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
    sorting,
    //columnFilters,
    globalFilter,
    },
  })

  React.useEffect(() => {
  table.setPageSize(pageSize);
}, [pageSize, table]);

 


  return (
    <div>
   
<div className="flex items-center py-10">
  <div className="bg-white px-4 py-3 rounded-md w-full shadow-sm">
    <div className="flex justify-between items-center flex-wrap gap-4">
      
     
      <div className="flex items-center space-x-4">
       
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
          <Input
            placeholder="Buscar"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-10 border-gray-500 w-sm"
          />
        </div>

        
        <Select onValueChange={(value) => setPageSize(value === "all" ? data.length : Number(value))}>
          <SelectTrigger className="w-[150px] border-gray-500">
            <SelectValue placeholder={`Mostrar: ${pageSize}`}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="all">Todos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      
      <div className="space-x-3">
        <Button size="sm" className="bg-gray-700 text-white hover:bg-gray-800">
          <Plus className="mr-1" /> Nuevo Usuario
        </Button>
        <Button size="sm" className="bg-gray-700 text-white hover:bg-gray-800">
          <Copy className="mr-1" /> Copiar Correos
        </Button>
      </div>
    </div>
  </div>
</div>


    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Ningún Resultado Coincide con la Búsqueda.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>



      <div className="flex justify-center items-center py-10 space-x-2">
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    &larr;
  </Button>

  {Array.from({ length: table.getPageCount() }, (_, index) => (
    <Button
      key={index}
      size="sm"
      variant={
        table.getState().pagination.pageIndex === index
          ? "default"
          : "outline"
      }
      onClick={() => table.setPageIndex(index)}
    >
      {index + 1}
    </Button>
  ))}

  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    &rarr;
  </Button>
</div>

    </div>
  )
}