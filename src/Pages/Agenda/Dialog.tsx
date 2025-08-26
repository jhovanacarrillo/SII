import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

interface DialogCellProps {
  triggerContent: React.ReactNode; 
  nombre: string;
  area: string;
  puesto: string;
  email: string;
}

export function DialogCell({ triggerContent, nombre, area, puesto, email }: DialogCellProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center gap-2 cursor-pointer ">
          {triggerContent}
        </div>
      </DialogTrigger>

      <DialogContent className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 [&>button]:text-gray-800 dark:[&>button]:text-white">
        <DialogHeader>
          <DialogTitle>Información del usuario</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 mt-4">
              <img
                className="w-26 h-26 rounded-full"
                src="../../../public/img/user3.jpeg"
                alt="Usuario"
              />
              <div className="flex flex-col">
                <p className="text-lg font-medium">{nombre}</p>
                <p className="text-sm text-muted-foreground">{area}</p>.
                


                
                <p className="text-sm text-muted-foreground">{puesto}</p>
                <p className="text-sm text-muted-foreground">{email}</p>

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
  );
}
