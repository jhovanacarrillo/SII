"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

interface UserFormValues {
  nombre: string
  email: string
  telefono: string
}

interface UserFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: UserFormValues) => void
  initialData?: UserFormValues | null // datos para editar
}

export function UserFormDialog({
  open,
  onClose,
  onSubmit,
  initialData
}: UserFormDialogProps) {
  const { register, handleSubmit, reset } = useForm<UserFormValues>({
    defaultValues: {
      nombre: "",
      email: "",
      telefono: ""
    }
  })

  // Si cambian los datos iniciales (modo editar), los precargamos
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({ nombre: "", email: "", telefono: "" })
    }
  }, [initialData, reset])

  const submitHandler = (data: UserFormValues) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <Input placeholder="Nombre" {...register("nombre", { required: true })} />
          <Input placeholder="Correo" type="email" {...register("email", { required: true })} />
          <Input placeholder="Teléfono" {...register("telefono")} />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{initialData ? "Guardar cambios" : "Crear"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
