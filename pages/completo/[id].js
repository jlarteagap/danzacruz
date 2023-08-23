import { useEffect, useState } from 'react'
import { db } from '../../firebase'
// import { usePathname } from 'next/navigation'

import { doc, getDoc } from 'firebase/firestore'

export default function RegComplete() {
  const [data, setData] = useState()
  const getUserdetails = async () => {
    const docRef = doc(db, 'user', '3dnPA092l7RxeegLdR9i')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data())
      setData(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }
  useEffect(() => {
    getUserdetails()
  }, [])

  console.log(data)
  // const data = getRegister(pathname.replace('/completo/', ''))
  // console.log(data)
  return (
    <>
      <div className="is-flex is-justify-content-center has-text-weight-bold">
        <h2 className="is-size-3 my-4">Formulario de registro</h2>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title is-justify-content-center is-flex is-flex-direction-column">
            <p>¡Bienvenido/a {data.name}</p>
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
