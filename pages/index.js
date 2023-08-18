import 'bulma/css/bulma.min.css'
import '../public/css/style.css'
import { AddParticipant } from '../src/components/addParticipan/addParticipant'

export default function Home() {
  return (
    <main className="container">
      <div className="is-flex is-justify-content-center has-text-weight-bold">
        <h2 className="is-size-3 my-4">Formulario de registro</h2>
      </div>
      <AddParticipant />
      <footer className="footer mt-5 is-flex is-justify-content-center">
        <div>Festival Danzacruz 2023</div>
      </footer>
    </main>
  )
}
