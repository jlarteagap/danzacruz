// import { PDFDownloadLink } from '@react-pdf/renderer'
import { getRegister } from '../../firebase'
// import { useEffect, useState } from 'react'
// import { Certificade } from '../../src/components/pdf/certificade'

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
  // const [isClient, setIsClient] = useState(false)

  // useEffect(() => setIsClient(true), [])
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
            Agradecemos sinceramente tu interés y entusiasmo por ser parte del
            XXIII Festival Internacional de Danzacruz 2023. Nos complace
            informarte que tu registro ha sido recibido con éxito.
          </p>

          <p>
            El evento se llevará a cabo del 5 al 8 de octubre en la hermosa
            ciudad de Santa Cruz, y estamos emocionados por contar con tu
            participación. Pronto, el equipo de la organización se comunicará
            contigo para completar el proceso de registro correspondiente y
            brindarte todos los detalles necesarios para tu participación.
          </p>
          <div
            className="message is-primary my-4"
            style={{ maxWidth: '400px', margin: 'auto' }}
          >
            <div class="message-header">
              <p className="has-text-centered">Datos del registro</p>
            </div>
            <div class="message-body has-text-justified">
              <ul>
                <li>
                  <strong>Participante: </strong>
                  {data[0].name}
                </li>
                <li>
                  <strong>Coreografia: </strong>
                  {data[0].coreografy}
                </li>
                <li>
                  <strong>Profesor/ Coreográfo: </strong>
                  {data[0].professor}
                </li>
                <li>
                  <strong>Categoria: </strong>
                  {data[0].category} - {data[0].division} -{' '}
                  {data[0].subDivision}
                </li>
                <li>
                  <strong>Modalidad: </strong>
                  {data[0].modalidity}
                </li>
              </ul>
            </div>
          </div>
          <p>
            Esperamos que este festival sea una experiencia enriquecedora y
            llena de momentos memorables en el mundo de la danza. ¡No podemos
            esperar a verte brillar en nuestro escenario!
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
            {/* {isClient ? (
              <PDFDownloadLink
                fileName="registro-danzacruz.pdf"
                document={<Certificade name={data[0].name} />}
              >
                <button className="button is-primary">
                  Descargar Certificado de participación
                </button>
              </PDFDownloadLink>
            ) : null} */}

            <a className="button is-warning">Ir a la página principal</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegComplete
