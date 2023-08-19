import { AddParticipant } from '../src/components/addParticipan/addParticipant'

export default function Home() {
  return (
    <>
      <div className="is-flex is-justify-content-center has-text-weight-bold">
        <h2 className="is-size-3 my-4">Formulario de registro</h2>
      </div>
      <AddParticipant />
    </>
  )
}
