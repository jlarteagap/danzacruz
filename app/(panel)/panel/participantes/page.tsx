import { Button } from '@/components/ui/button'
// import { ListSubscribers } from '../src/components/subscribers/listSubscribers'
import { getSubscribers } from '@/lib/firebase'

export default async function Participantes() {
  const data = []
  const getListOfSusbcribers = await getSubscribers('register')
  getListOfSusbcribers.forEach(doc => {
    return data.push({ id: doc.id, ...doc.data() })
  })

  console.log(data)
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-2xl">Lista de participantes</h2>
      </div>
      <div>
        {data.map((sub, i) => {
          const {
            id,
            name,
            phone,
            // email,
            modalidity,
            coreografy,
            professor,
            category,
            division,
            subDivision,
            status
          } = sub

          return (
            <div key={i}>
              <div className="grid gap-3 grid-cols-4 bg-white p-5 rounded-md shadow-sm my-3">
                <div className="flex flex-col">
                  <p className="font-semibold">{name}</p>
                  <span className="text-sm">{phone}</span>
                </div>
                <div className="text-sm">
                  <strong>Modalidad: </strong> {modalidity} <br />
                  <strong>Categoria: </strong> {category} <br />
                  <strong>Division: </strong> {division} <br />
                  <strong>Sub Division: </strong> {subDivision} <br />
                </div>
                <div className="text-sm">
                  <strong>Coreografía: </strong>
                  <br /> {coreografy}
                  <br />
                  <strong>Profesor / Coreografo: </strong>
                  <br />
                  {professor}
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-fuchsia-700 text-white p-3 rounded-sm inline-block"
                    // onClick={() => updateRegister(id, !status, 'register')}
                  >
                    {status ? 'Confirmado' : 'Sin Confirmar'}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
