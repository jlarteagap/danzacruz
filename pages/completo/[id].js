import { db } from '../../firebase'
// import { usePathname } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'

export const getServerSideProps = async () => {
  const data = []
  const docRef = doc(db, 'user', '91x5bu6Zeg0MZ7jdC6xK')
  const docSnap = await getDoc(docRef)
  // const data = getRegister(pathname.replace('/completo/', ''))

  if (docSnap.exists()) {
    data.push(docSnap.data())
  } else {
    console.log('No such document!')
  }
  return {
    props: { data }
  }
}

const RegComplete = ({ data }) => {
  return (
    <>
      <div className="is-flex is-justify-content-center has-text-weight-bold">
        <h2 className="is-size-3 my-4">Formulario de registro</h2>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title is-justify-content-center is-flex is-flex-direction-column">
            <p>¡Bienvenido/a {data[0].name}</p>
            <h3 className="is-size-4 has-text-weight-bold has-text-centered">
              XXIII Festival Internacional de danza
              <br /> DANZACRUZ 2023!
            </h3>
          </div>
        </div>
        <div className="card-content is-size-5 has-text-centered">
          <p>
            Queremos expresar nuestro sincero agradecimiento por registrarte y
            ser parte de este emocionante evento.
          </p>

          <p>
            Tu pasión por la danza es lo que hace que este festival sea
            especial, y no podemos esperar para ver tu talento brillar en
            nuestro escenario. Tu participación enriquecerá la experiencia de
            todos nosotros.
          </p>
          <p>
            Mantente atento/a a las actualizaciones que compartiremos pronto. Si
            tienes alguna pregunta, no dudes en contactarnos.
          </p>
          <p className="mt-6">
            ¡Nos vemos pronto!
            <br />
            Con gratitud, <br />
            El Equipo de Danzacruz 2023
          </p>
        </div>
      </div>
    </>
  )
}

export default RegComplete
