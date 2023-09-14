import React from 'react'
import { updateRegister } from '../../../firebase'

export const ListSubscribers = ({ data }) => {
  const updateDoc = (id, status) => {
    updateRegister(id, { status }, 'user')
  }
  return (
    <>
      <div className="list__content notification is-primary">
        <div>#</div>
        <div>Participante</div>
        <div>Contacto</div>
        <div>Modalidad</div>
        <div>Coreografia</div>
        <div> Categoria</div>
        <div>División</div>
        <div>Sub División</div>
        <div>Coreografo / Profesor</div>
        <div>Confirmado</div>
      </div>
      {data.map((sub, i) => {
        return (
          <div
            key={i}
            className={`list__content notification is-light is-align-items-center ${
              sub.status ? 'is-info' : 'is-secondary'
            }`}
          >
            <div>{i + 1}</div>
            <div>{sub.name}</div>
            <div>
              {sub.email} <br /> {sub.phone}
            </div>
            <div>{sub.modalidity}</div>
            <div>{sub.coreografy}</div>
            <div> {sub.categoryType}</div>
            <div>{sub.categoryGroup}</div>
            <div>{sub.categoryAge}</div>
            <div>{sub.professor}</div>
            <button
              className={`button is-small ${
                sub.status ? 'is-success' : 'is-secondary is-outlined'
              }`}
              onClick={() => updateDoc(sub.id, !sub.status)}
              disabled={sub.status}
            >
              {sub.status ? 'Registrado' : 'Sin Registrar'}
            </button>
          </div>
        )
      })}
    </>
  )
}