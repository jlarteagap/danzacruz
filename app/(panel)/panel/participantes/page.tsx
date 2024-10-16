// import { Button } from '@/components/ui/button'
// import { ListSubscribers } from '../src/components/subscribers/listSubscribers'
import { getSubscribers } from '@/lib/firebase'


export default async function Participantes() {
  const data = []
  const getListOfSusbcribers = await getSubscribers("register")
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
            name,
            phone,
            email,
            modalidity,
            coreografy,
            professor,
            category,
            division,
            subDivision, status
          } = sub
          return (
            <div key={i}>
              <div className="message-body">
                <div className="list__content" style={{ gap: '1rem' }}>
                  <div>
                    <strong>Participante:</strong> {name} <br />
                    <strong>Telefono:</strong>
                    {phone} <br />
                    <strong>Correo: </strong>
                    {email}
                  </div>
                  <div>
                    <strong>Modalidad: </strong> <br /> {modalidity}
                  </div>
                  <div>
                    <strong>Coreografía: </strong> {coreografy}
                    <br />
                    <strong>Profesor / Coreografo: </strong>
                    {professor}
                  </div>
                  <div>
                    <strong>Categoria: </strong> {category} <br />
                    <strong>Division: </strong> {division} <br />
                    <strong>Sub Division: </strong> {subDivision} <br />
                  </div>
                  <div>
                    <button
                      className={`button ${
                        status ? 'is-success' : 'is-secondary is-outlined'
                      }`}
                      // onClick={() => updateDoc(sub.id, !sub.status)}
                      disabled={status}
                    >
                      {status ? 'Confirmado' : 'Sin Confirmar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
