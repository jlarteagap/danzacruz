import React from 'react'
import {
  InputField,
  RadioFields,
  SelectField,
  ButtonField
} from '../form/Fileds'
import { general, modalidad, category, categoryGroup } from './utils'
export const FormParticipant = () => {
  return (
    <>
      <InputField
        label="Nombre del participante o agrupación"
        type="text"
        name="name"
      />
      <InputField
        label="Nombre de la Coreografia"
        type="text"
        name="coreografy"
      />
      <div>
        <h3 className="is-size-4">Categoría</h3>
      </div>
      <div className="columns">
        <div className="column">
          <RadioFields options={category} name="categoryType" />
          <SelectField
            label=""
            name="categoryAge"
            type="select"
            options={general}
          />
        </div>
        <div className="column">
          <RadioFields options={categoryGroup} name="categoryGroup" />
        </div>
      </div>
      <SelectField
        label="Modalidad"
        name="modalidity"
        type="select"
        options={modalidad}
      />
      <InputField
        label="Nombre del profesor o Coreográfo"
        type="text"
        name="professor"
      />
      <InputField label="Telefono" type="text" name="phone" />
      <InputField label="Correo electrónico" type="text" name="email" />

      <ButtonField
        type="submit"
        addText="Registrar ahora"
        classType="is-primary"
      />
    </>
  )
}
