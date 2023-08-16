import 'bulma/css/bulma.min.css'
import { AddParticipant } from '../src/components/addParticipan/addParticipant'

export default function Home() {
  return (
    <main className="container">
      <div className="is-flex is-justify-content-center has-text-weight-bold">
        <h2 className="is-size-3 my-4">Formulario de registro</h2>
      </div>
      <div className="card m-auto" style={{ width: '50%' }}>
        <div className="card-content">
          <AddParticipant />
        </div>
      </div>
    </main>
  )
}
