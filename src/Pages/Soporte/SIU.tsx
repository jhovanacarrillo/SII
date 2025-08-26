//import { Input } from "@/components/ui/input"
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
//import { Input } from "@/components/ui/input"
//import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import axios from "axios";

//import { IconHeadset } from "@tabler/icons-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type MultiSelectOption = {
  label: string;
  value: string;
};


interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  className?: string; 
}

function MultiSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
}: MultiSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between rounded-md border border-gray-300 shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-neutral-500",
            className 
          )}
        >
          {value.length > 0
            ? options
                .filter((o) => value.includes(o.value))
                .map((o) => o.label)
                .join(", ")
            : placeholder ?? "Seleccionar..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No hay opciones</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const selected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    className="cursor-pointer"
                    onSelect={() => {
                      if (selected) {
                        onChange(value.filter((v) => v !== option.value));
                      } else {
                        onChange([...value, option.value]);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-cyan-600",
                        selected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


// ---- Formulario Principal ----
type FormValues = {
  inventarioequipo: string;
  marca: string;
  modelo: string;
  serie: string;
  otro1: string[];
  otro2: string[];
  categorias: string[];
  intereses: string[];
  habilidades: string[];
    habilitarObservaciones: boolean;
  observacionesFinales: string;
};

export default function WizardForm() {
  const { control, handleSubmit, register, watch} = useForm<FormValues>({
    defaultValues: {
      inventarioequipo: "",
      marca: "",
      modelo: "",
      serie: "",
      categorias: [],
      intereses: [],
      habilidades: [],
      otro1: [],
      otro2: [],


    },
  });

  const [step, setStep] = useState(1);

  const habilitarObs = watch("habilitarObservaciones", false);

  const onSubmit = async (data: FormValues) => {
    console.log("Enviando datos:", data);
    try {
      const res = await axios.post("/api/form", data);
      console.log("Respuesta:", res.data);
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };




  return (
  

    <div className="flex justify-center items-center h-screen bg-gray-100 p-4 dark:bg-neutral-950">
     <div className="bg-white shadow-md rounded-xl w-full max-w-3xl p-6 overflow-auto max-h-[90vh] dark:bg-neutral-800">


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">


          <div className="flex items-center gap-3 mb-8">
            {/* <IconHeadset stroke={2} className="text-neutral-700 w-10 h-10" /> */}
            <img src="../../../public/img/headphone.png" className="w-15 h-15 dark:invert dark:brightness-100"></img> 

            <div className="flex flex-col">
              <span className="font-semibold text-2xl text-neutral-800 dark:text-neutral-100">Soporte Técnico</span>
              <span className="text-md text-gray-400">
                Información del Soporte
              </span>
            </div>
          </div>

          {step === 1 && (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col">
                <label htmlFor="inventarioequipo" className="mb-2 font-medium text-neutral-800 dark:text-neutral-200">
                  Inventario del Equipo
                </label>
                <input
                  id="inventarioequipo"
                  type="text"
                  {...register("inventarioequipo")}
                  className="border rounded-md p-2 w-md focus:outline-none focus:border-neutral-500 dark: border-neutral-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="marca" className="mb-1 font-medium text-neutral-800 dark:text-neutral-200">
                  Marca
                </label>
                <input
                  id="marca"
                  type="text"
                  placeholder="Marca del equipo"
                  {...register("marca")}
                  className="border rounded-md p-2 w-md focus:outline-none focus:border-neutral-500 border-neutral-400"

                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="modelo" className="mb-1 font-medium text-neutral-800 0 dark:text-neutral-200">
                  Modelo
                </label>
                <input
                  id="modelo"
                  type="text"
                  placeholder="Modelo del equipo"
                  {...register("modelo")}
                  className="border rounded-md p-2 w-md focus:outline-none focus:border-neutral-500 border-neutral-400"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="serie" className="mb-1 font-medium text-neutral-800 0 dark:text-neutral-200">
                  Serie
                </label>
                <input
                  id="serie"
                  type="text"
                  placeholder="Serie del equipo"
                  {...register("serie")}
                  className="border rounded-md p-2 w-md focus:outline-none focus:border-neutral-500 border-neutral-400"

                />
              </div>
            </div>
          )}

         
          {step === 2 && (
            <div className="grid grid-cols-3 gap-4">
              <Controller
                control={control}
                name="categorias"
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "np/noi", label: "No prende / No inicia" },
                      { value: "reinic", label: "Se reinicia" },
                      { value: "virus", label: "Malware(virus)" },
                      { value: "Ap", label: "Archivos perdidos" },
                      { value: "inter", label: "Internet" },
                      { value: "webins", label: "Página institucional" },
                      { value: "BL", label: "Bloqueo / Lentitud" },                   
                      { value: "webins", label: "Página institucional" },
                      { value: "error", label: "Mensaje de error" },
                      { value: "conred", label: "Conexión a la red" },
                      { value: "CIE", label: "Configurar impresora / Escanér" },
                      { value: "otros", label: "Otros" },
                    ]}
                    placeholder="Soporte Técnico"
      className="bg-white border-neutral-300 text-gray-800 dark:text-neutral-200 dark:border-neutral-500" 
                  />
                )}
              />

             

              <Controller
  control={control}
  name="intereses"
  render={({ field }) => (
    <MultiSelect
      value={field.value}
      onChange={field.onChange}
      options={[
        { value: "impre", label: "Impresora" },
        { value: "TM", label: "Teclado / Mouse" },
        { value: "pantalla", label: "Pantalla" },
        { value: "Regu", label: "Regulador" },
        { value: "UCD/DVD", label: "Unidad CD / DVD" },
        { value: "PUSB", label: "Puertos USB" },
        { value: "sonido", label: "Sonido" },
        { value: "escaner", label: "Escáner" },
        { value: "LT", label: "Línea Telefónica" },
        { value: "otros", label: "Otros" },
      ]}
      placeholder="Revisión y/o Mantenimiento"
      className="bg-white border-neutral-300 text-gray-800 dark:text-neutral-200 dark:border-neutral-500" 
    />
  )}
/>



              <Controller
                control={control}
                name="habilidades"
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "todo", label: "Todos(Completa)" },
                      { value: "antivirus", label: "Antivirus" },
                      { value: "word", label: "Word" },
                      { value: "excel", label: "Excel" },
                      { value: "power point", label: "Power Point" },
                      { value: "cliente-correo", label: "Cliente de Correo" },
                      { value: "lector pdf", label: "Lector PDF" },
                      { value: "illustrador", label: "Illustrador" },
                      { value: "photoshop", label: "Photoshop" },
                      { value: "corel draw", label: "Corel Draw" },
                      { value: "otro", label: "Otro" },
                    ]}
                    placeholder="Instalar y Reinstalar Programas"
      className="bg-white border-neutral-300 text-gray-800 dark:text-neutral-200 dark:border-neutral-500" 

                  />
                )}
              />


              <div className="col-span-3">
                <label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1 dark:text-neutral-200">
    Observaciones
  </label>
      <textarea
        className="w-full border rounded-md p-2 mt-2  focus:outline-none focus:border-neutral-300 dark: border-neutral-300"
        rows={4}
        placeholder="(Información adicional, breve detalle de las anomalías, aclaración de otros o lista de otros programas)"
      />
    </div>


      <Controller
  control={control}
  name="intereses"
  render={({ field }) => (
    <MultiSelect
      value={field.value}
      onChange={field.onChange}
      options={[
        { value: "Misdoc", label: "Mis Documentos" },
        { value: "IMG", label: "Mis Imágenes" },
        { value: "Fav", label: "Favoritos" },
        { value: "descargas", label: "Descargas" },
        { value: "correo", label: "Correo Electrónico" },
        { value: "escri", label: "Escritorio" },
        { value: "otros", label: "Otros" },
      ]}
      placeholder="Copia de Seguridad"
      className="bg-white border-neutral-300 text-gray-800 dark:text-neutral-200 dark:border-neutral-500" 
    />
  )}
/>



              <Controller
                control={control}
                name="habilidades"
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "frontend", label: "PC de Escritorio" },
                      { value: "backend", label: "Laptop" },
                      { value: "design", label: "Impresora" },
                      { value: "design", label: "Video-Proyector" },
                      { value: "design", label: "Escáner" },
                      { value: "design", label: "Apuntador" },
                      { value: "design", label: "Pantalla para Proyección" },
                      { value: "design", label: "Otro" },
                    ]}
                    placeholder="Solicitud de Equipo Informático"
      className="bg-white border-neutral-300 text-gray-800 dark:text-neutral-200 dark:border-neutral-500"  

                  />
                )}
              />


               <Controller
                control={control}
                name="habilidades"
                render={({ field }) => (
                  <MultiSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "frontend", label: "Alta" },
                      { value: "backend", label: "Baja" },
                      { value: "design", label: "Modificación" },
                      { value: "design", label: "Suspensión" },
                      { value: "design", label: "Configuración" },
                      { value: "design", label: "Cliente de Correo (PC / Smartphone / Tablet)" },
                    ]}
                    placeholder="Correo Institucional"
      className="bg-white border-neutral-300 text-gray-800 dark:text-neutral-200 dark:border-neutral-500" 

                  />
                )}
              />

               <div className="col-span-3">
                <label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1 dark:text-neutral-200">
    Observaciones
  </label>
      <textarea
        className="w-full border rounded-md p-2  focus:outline-none focus:border-neutral-300 mt-2 dark: border-neutral-300"
        rows={4}
        placeholder="(Otras carpetas y archivos a respaldar, u otros programas de correo electrónico)"
      />
    </div>


    <div className="col-span-3 flex items-center gap-2">
      <input type="checkbox" id="habilitarObservaciones" {...register("habilitarObservaciones")}
      className="w-4 h-4 accent-cyan-600"/>
      <label htmlFor="habilitarObservaciones"  className="text-sm font-bold text-gray-700 dark:text-neutral-100" >Otros <span className="font-medium dark: text-neutral-300">Si ninguna de las opciones anteriores satisface los requerimientos de su solicitud:</span></label>
    </div>


<div className="col-span-3">
                <label
                  htmlFor="observacionesFinales"
                  className="text-sm font-medium text-gray-700 mb-1 dark:text-neutral-100"
                >
                 Descripción
                </label>
                <textarea
                  id="observacionesFinales"
                  {...register("observacionesFinales")}
                  disabled={!habilitarObs}
                  className={`w-full border rounded-md p-2 ${
                    habilitarObs
                      ? "bg-white  focus:outline-none focus:border-neutral-300 dark: text-neutral-200 dark:bg-neutral-800 dark: border-neutral-400" 
                      : "bg-gray-200 cursor-not-allowed mt-2 dark:bg-neutral-600 "
                  }`}
                  rows={4}
                  placeholder="(Breve detalle de tu solicitud)"
                />
              </div>
            </div>
          

 )}

     {/* <div className="col-span-3">
                <label htmlFor="observaciones" className="text-sm font-medium text-gray-700 mb-1">
    Observaciones
  </label>
      <textarea
        className="w-full border rounded-md p-2"
        rows={4}
        placeholder="(Breve detalle de su solicitud)"
      />
    </div>



            </div> */}
         

          
          <div className="flex justify-end gap-5 ">
            {step > 1 && (
              <Button type="button" onClick={() => setStep(step - 1)} className="bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950">
                Regresar
              </Button>
            )}
            {step < 2 ? (
              <Button type="button" onClick={() => setStep(step + 1)} className="bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950">
                Siguiente
              </Button>
            ) : (
              <Button type="submit" className="bg-gray-700 text-white hover:bg-gray-800 dark:bg-neutral-100 dark:text-neutral-950">Enviar</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

