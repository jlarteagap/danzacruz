import React from 'react'
import { InputField } from '../form/Fileds'
export const FormParticipant = () => {
  return (
    <>
      <InputField
        label="Nombre del participante o agrupación"
        type="text"
        name="name"
      />
      <InputField label="Nombre de la Coreografia" type="text" name="name" />
      <InputField label="Numero de participantes" type="text" name="name" />
      <InputField
        label="Nombre del profesor o Coreográfo"
        type="text"
        name="name"
      />
      <InputField label="Telefono" type="text" name="name" />
      <InputField label="Correo electrónico" type="text" name="name" />
    </>
  )
}
