import { PDFDownloadLink } from '@react-pdf/renderer'
import { getRegister } from '../../firebase'
import { useEffect, useState } from 'react'
import { Certificade } from '../../src/components/pdf/certificade'

export const getServerSideProps = async context => {
  const path = context.req.url
  const data = []

  const registro = await getRegister(path.replace('/completo/', ''), 'user')
  data.push(registro.data())

  return {
    props: { data }
  }
}

const RegComplete = ({ data }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])
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
          <div
            className="mt-5 is-flex is-justify-content-center"
            style={{ gap: '2rem' }}
          >
            {isClient ? (
              <PDFDownloadLink
                fileName="registro-danzacruz.pdf"
                document={<Certificade name={data[0].name} />}
              >
                <button className="button is-primary">
                  Descargar Certificado de participación
                </button>
              </PDFDownloadLink>
            ) : null}

            <a className="button is-warning">Ir a la página principal</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegComplete
