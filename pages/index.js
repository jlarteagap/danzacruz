import 'bulma/css/bulma.min.css'
import { AddParticipant } from '../src/components/addParticipan/addParticipant'

export default function Home() {
  return (
    <main className="">
      <button className="button is-danger">Danger</button>
      <AddParticipant />
    </main>
  )
}
