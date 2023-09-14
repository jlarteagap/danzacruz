import React from 'react'
import {
  InputField,
  RadioFields,
  SelectField,
  ButtonField,
  InputFile
} from '../form/Fileds'
import { general, modalidad, category, categoryGroup, colegios } from './utils'
export const FormParticipant = ({ categoryTypeProp, setFieldValue }) => {
  return (
    <div className="card m-auto dc__wrapper">
      <div className="card-content">
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
              label="División"
              name="categoryAge"
              type="select"
              options={categoryTypeProp === 'General' ? general : colegios}
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
        <InputFile
          name="logo"
          type="file"
          onChange={event => {
            setFieldValue('logo', event.currentTarget.files[0])
          }}
        />
        <div className="is-flex is-justify-content-center pt-3">
          <ButtonField
            type="submit"
            addText="Registrar ahora"
            classType="is-primary"
          />
        </div>
      </div>
    </div>
  )
}
