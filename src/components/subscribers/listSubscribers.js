import React from 'react'
import { deleteRegister, updateRegister } from '../../../firebase'

export const ListSubscribers = ({ data }) => {
  const deleteDoc = id => {
    deleteRegister(id, 'user')
  }
  const updateDoc = id => {
    updateRegister(id, { status: true }, 'user')
  }
  return (
    <>
      <div className="list__content notification is-primary">
        <div>#</div>
        <div>Participante</div>
        <div>Modalidad</div>
        <div>Coreografia</div>
        <div> Categoria</div>
        <div>División</div>
        <div>Sub División</div>
        <div>Coreografo / Profesor</div>
        <div>Confirmado</div>
        <div>Acciones</div>
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
            <div>{sub.modalidity}</div>
            <div>{sub.coreografy}</div>
            <div> {sub.categoryType}</div>
            <div>{sub.categoryGroup}</div>
            <div>{sub.categoryAge}</div>
            <div>{sub.professor}</div>
            <div>
              <input
                className="checkbox"
                type="checkbox"
                checked={sub.status}
                onClick={() => updateDoc(sub.id)}
                readOnly
              />
            </div>
            <div className="button is-danger" onClick={() => deleteDoc(sub.id)}>
              Eliminar
            </div>
          </div>
        )
      })}
    </>
  )
}
