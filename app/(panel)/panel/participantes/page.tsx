import { Suspense } from 'react'
import ListParticipants from './ListParticipants'
import { getSubscribers } from '@/lib/firebase'
import { ExportToExcel } from '@/components/ExportoToExcel/ExportoToExcel'

export default async function Participantes() {
  const getServerData = getSubscribers('register-data') as () => Promise<any[]>
  const initialData = await getServerData()

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de participantes</h2>
        <ExportToExcel
          data={initialData}
          fileName="Lista de Participantes"
          sheetName="Participantes"
        />
      </div>
      <div className="grid gap-3 grid-cols-5 bg-white p-5 rounded-md shadow-sm my-3">
        <div className="text-center">Datos personales</div>
        <div className="text-center">Participación</div>
        <div className="text-center">Datos Coreografía</div>
        <div className="text-center">Aclaraciones</div>
        <div className="text-center">Acciones</div>
      </div>
      {initialData.length === 0 ? (
        <h3 className="text-center my-5 bg-white p-5 font-semibold">
          Aun no existen registros...
        </h3>
      ) : (
        <Suspense fallback={<div>Cargando...</div>}>
          <ListParticipants initialData={initialData} />
        </Suspense>
      )}
    </section>
  )
}
