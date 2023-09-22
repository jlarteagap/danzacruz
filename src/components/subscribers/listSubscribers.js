import React from 'react'
import { updateRegister } from '../../../firebase'
import Image from 'next/image'
export const ListSubscribers = ({ data }) => {
  const updateDoc = (id, status) => {
    updateRegister(id, { status }, 'user')
  }
  return (
    <>
      {data.map((sub, i) => {
        return (
          <div
            className={`message ${sub.status ? 'is-success' : 'is-secondary'}`}
            key={i}
          >
            <div className="message-header">Participante: {sub.name}</div>
            <div className="message-body">
              <div className="list__content" style={{ gap: '1rem' }}>
                <div className="image is-64x64">
                  {sub.logo ? (
                    <Image
                      src={sub.logo}
                      width="50"
                      height="50"
                      alt={sub.name}
                      className="is-rounded"
                    />
                  ) : null}
                </div>
                <div>
                  <strong>Telefono:</strong>
                  {sub.phone} <br />
                  <strong>Correo: </strong>
                  {sub.email}
                </div>
                <div>
                  <strong>Modalidad: </strong> <br /> {sub.modalidity}
                </div>
                <div>
                  <strong>Coreografía: </strong> {sub.coreografy}
                  <br />
                  <strong>Profesor / Coreografo: </strong>
                  {sub.professor}
                </div>
                <div>
                  <strong>Categoria: </strong> {sub.category} <br />
                  <strong>Division: </strong> {sub.division} <br />
                  <strong>Sub Division: </strong> {sub.subDivision} <br />
                </div>
                <div>
                  <button
                    className={`button ${
                      sub.status ? 'is-success' : 'is-secondary is-outlined'
                    }`}
                    onClick={() => updateDoc(sub.id, !sub.status)}
                    disabled={sub.status}
                  >
                    {sub.status ? 'No confirmado' : 'Sin Confirmar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          // <div
          //   key={i}
          //   className={`list__content notification is-light is-align-items-center ${
          //     sub.status ? 'is-info' : 'is-secondary'
          //   }`}
          // >
          //   <div>{i + 1}</div>
          //   <div>
          //     {sub.logo ? (
          //       <Image src={sub.logo} width="50" height="50" alt={sub.name} />
          //     ) : null}

          //     {sub.name}
          //   </div>
          //   <div>
          //     {sub.email} <br /> {sub.phone}
          //   </div>
          //   <div>{sub.modalidity}</div>
          //   <div>{sub.coreografy}</div>
          //   <div> {sub.categoryType}</div>
          //   <div>{sub.subDivision}</div>
          //   <div>{sub.division}</div>
          //   <div>{sub.professor}</div>
          //   <button
          //     className={`button is-small ${
          //       sub.status ? 'is-success' : 'is-secondary is-outlined'
          //     }`}
          //     onClick={() => updateDoc(sub.id, !sub.status)}
          //     disabled={sub.status}
          //   >
          //     {sub.status ? 'Registrado' : 'Sin Registrar'}
          //   </button>
          // </div>
        )
      })}
    </>
  )
}
