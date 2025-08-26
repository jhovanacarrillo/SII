import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconClipboardText,
  IconEdit,
  IconUserOff,
  IconGripHorizontal,
} from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { IconExclamationCircle } from "@tabler/icons-react";

interface Usuario {
  id: string;
  nombre_completo: string;
  correo?: string;
}

interface ActionsCellProps {
  usuario: Usuario;
}


export const ActionsCell: React.FC<ActionsCellProps> = ({ usuario }) => {
  const [isAdmin] = React.useState(false); // se cambia segun el permiso
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const [formData, setFormData] = React.useState({
    nombre: usuario.nombre_completo || "",
    correo: usuario.correo || "",
    
    permiso: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermisoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, permiso: value }));
  };

// Documento

const handleDocumento = async () => {
    try {
      const res = await axios.get(`/api/usuarios/${usuario.id}/documento`);
      console.log("Documento recibido:", res.data);
      // Aquí puedes descargar, mostrar o procesar el documento
    } catch (error) {
      console.error("Error al obtener documento", error);
    }
  };


  //Editar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      await axios.put(`/api/usuarios/${usuario.id}`, formData);
      console.log("Usuario actualizado correctamente", formData);
      setOpenEditDialog(false)
    }catch (error){
      console.error("Error al actualizar usuario", error);
    }

  };



  //Eliminar Uusraio

   const handleDelete = async () => {
    try {
      await axios.delete(`/api/usuarios/${usuario.id}`);
      console.log("Usuario eliminado:", usuario.id);
      setOpenAlert(false);
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Datos editados:", formData);
  //   setOpenEditDialog(false);
  // };

  return (
    <>
      {/* Escritorio*/}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <IconGripHorizontal stroke={2} className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>

            <DropdownMenuItem 
            className="gap-2 cursor-pointer"
            onClick={handleDocumento}
            >
              <IconClipboardText stroke={3} className="w-4 h-4" />
              Documento
            </DropdownMenuItem>

            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenEditDialog(true);
                }}
              >
                <IconEdit stroke={2} className="w-4 h-4" />
                Editar
              </DropdownMenuItem>

              <DialogContent className="max-w-2xl bg-white dark:bg-neutral-900 dark:text-neutral-100">
                <DialogHeader>
                  <DialogTitle className="text-gray-700 dark:text-neutral-100">
                    Editar Usuario
                  </DialogTitle>
                  <DialogDescription>
                    Actualiza los datos necesarios del Usuario.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
                >
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Nombre(s)
                    </label>
                    <Input
                      name="nombre"
                      placeholder="Nombre"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Correo Institucional
                    </label>

                    <Input
                      type="email"
                      name="correo"
                      placeholder="Correo electrónico"
                      value={formData.correo}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Puesto
                    </label>
                    <Select>
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
                    <label className="block text-sm font-medium mb-1">Área</label>
                    <Select>
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
                    <Input type="date" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Fecha de finalización del contrato
                    </label>
                    <Input type="date" required />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Permiso de usuario
                    </label>
                    <Select
                      disabled={!isAdmin}
                      onValueChange={handlePermisoChange}
                      value={formData.permiso}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            isAdmin ? "Selecciona permiso" : "Solo administradores"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuario</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="editor">Jurídico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter className="sm:col-span-2 flex justify-end gap-2 mt-4">
                    <Button
                      type="button"
                      onClick={() => setOpenEditDialog(false)}
                      className="bg-gray-700 text-neutral-100 hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                    >
                      Guardar Cambios
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <DropdownMenuItem
                className="gap-2 text-red-600 cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenAlert(true);
                }}
              >
                <IconUserOff stroke={2} className="w-4 h-4" />
                Eliminar Usuario
              </DropdownMenuItem>

              <AlertDialogContent className="bg-neutral-100 rounded-3xl shadow-xl border-none p-8 max-w-sm text-center transition-colors dark:bg-neutral-900">
                <div className="flex justify-center mb-4">
                  <div className="bg-neutral-100 rounded-full p-2 dark:bg-neutral-900">
                    <IconExclamationCircle
                      stroke={2}
                      className="w-18 h-18 text-red-500"
                    />
                  </div>
                </div>

                <AlertDialogHeader>
                  <AlertDialogTitle className="text-neutral-800 text-2xl font-semibold text-center dark:text-neutral-200">
                    ¿Estás seguro querer dar de baja al Usuario?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-neutral-600 mt-2 text-sm text-center dark:text-neutral-300">
                    Esta acción dará de baja al usuario y no podrás revertirla.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex justify-center gap-4 mt-6">
                  <AlertDialogCancel className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-200 dark:text-neutral-100 ">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-white text-red-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
                    onClick= {handleDelete}
                    //   console.log("Usuario dado de baja");
                    //   setOpenAlert(false);
                    // }}
                  >
                    Aceptar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Móvil*/}
      <div className="flex md:hidden gap-3 justify-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Documento"
          onClick={() => console.log("Documento clickeado")}
          title="Documento"
        >
          <IconClipboardText stroke={2} className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Editar"
          onClick={() => setOpenEditDialog(true)}
          title="Editar"
        >
          <IconEdit stroke={2} className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Eliminar"
          onClick={() => setOpenAlert(true)}
          title="Eliminar Usuario"
          className="text-red-600"
        >
          <IconUserOff stroke={2} className="w-5 h-5" />
        </Button>
      </div>


{/* Editar */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent className="max-w-2xl bg-white dark:bg-neutral-900 dark:text-neutral-100">
            <DialogHeader>
              <DialogTitle className="text-gray-700 dark:text-neutral-100">
                Editar Usuario
              </DialogTitle>
              <DialogDescription>
                Actualiza los datos necesarios del Usuario.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
            >
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Nombre(s)</label>
                <Input
                  name="nombre"
                  placeholder="Nombre"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Correo Institucional
                </label>

                <Input
                  type="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  value={formData.correo}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Puesto</label>
                <Select>
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
                <label className="block text-sm font-medium mb-1">Área</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sistemas">Sistemas</SelectItem>
                    <SelectItem value="recursos-humanos">Recursos Humanos</SelectItem>
                    <SelectItem value="finanzas">Finanzas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Fecha de inicio del contrato
                </label>
                <Input type="date" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Fecha de finalización del contrato
                </label>
                <Input type="date" required />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Permiso de usuario
                </label>
                <Select
                  disabled={!isAdmin}
                  onValueChange={handlePermisoChange}
                  value={formData.permiso}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isAdmin ? "Selecciona permiso" : "Solo administradores"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Jurídico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="sm:col-span-2 flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  onClick={() => setOpenEditDialog(false)}
                  className="bg-gray-700 text-neutral-100 hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950"
                >
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/*Eliminar */}
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="bg-neutral-100 rounded-3xl shadow-xl border-none p-8 max-w-sm text-center transition-colors dark:bg-neutral-900">
            <div className="flex justify-center mb-4">
              <div className="bg-neutral-100 rounded-full p-2 dark:bg-neutral-900">
                <IconExclamationCircle
                  stroke={2}
                  className="w-18 h-18 text-red-500"
                />
              </div>
            </div>

            <AlertDialogHeader>
              <AlertDialogTitle className="text-neutral-800 text-2xl font-semibold text-center dark:text-neutral-200">
                ¿Estás seguro querer dar de baja al Usuario?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-600 mt-2 text-sm text-center dark:text-neutral-300">
                Esta acción dará de baja al usuario y no podrás revertirla.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex justify-center gap-4 mt-6">
              <AlertDialogCancel className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-200 dark:text-neutral-100 ">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-white text-red-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
                onClick={() => {
                  console.log("Usuario dado de baja");
                  setOpenAlert(false);
                }}
              >
                Aceptar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
