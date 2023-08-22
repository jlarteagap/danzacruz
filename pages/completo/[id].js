import { db } from '../../firebase'
// import { usePathname } from 'next/navigation'

import { doc, getDoc } from 'firebase/firestore'

export default function RegComplete() {
  const docRef = doc(db, 'users', '43E616QqLvC1rzJiMqEg')
  const docSnap = getDoc(docRef)

  // const pathname = usePathname()
  console.log('Document data:', docSnap.data())
  // const data = getRegister(pathname.replace('/completo/', ''))
  // console.log(data)
  return (
    <>
      <div className="is-flex is-justify-content-center has-text-weight-bold">
        <h2 className="is-size-3 my-4">Formulario de registro</h2>
      </div>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title is-justify-content-center is-flex is-size-4">
            <strong>
              ¡Bienvenido/a al XXII Festival Internacional de danza - DANZACRUZ
              2023!
            </strong>
          </p>
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
