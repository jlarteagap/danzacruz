import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import FormAds from './components/FormAds'

export default function Auspiciadores() {
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de auspiciadores</h2>
        <Dialog>
          <DialogTrigger>
            <Button>Agregar auspiciador</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar un aspiciante o apoyo</DialogTitle>
              <DialogDescription>
                <FormAds />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        logo nombre categoria [- Auspiciador - Colaborador - Apoyo]
      </div>
    </section>
  )
}
