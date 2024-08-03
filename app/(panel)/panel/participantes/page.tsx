import { Button } from '@/components/ui/button'

export default function Participantes() {
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de participantes</h2>
        <Button>Nuevo participante</Button>
      </div>
    </section>
  )
}
