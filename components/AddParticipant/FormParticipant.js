'use client'

import React from 'react'
import {
  InputField,
  RadioFields,
  SelectField,
  ButtonField
} from '../../src/components/form/Fileds'
import { general, modalidad, category, subDivision, colegios } from './utils'

export const FormParticipant = ({ categoryProp, setFieldValue }) => {
  return (
    <div className="text-right">
      <div className="">
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
          <h3 className="">Categoría</h3>
        </div>
        <div className="">
          <div className="">
            <RadioFields options={category} name="category" />
            <SelectField
              label="División"
              name="division"
              type="select"
              options={categoryProp === 'General' ? general : colegios}
            />
          </div>
          <div className="column">
            <RadioFields options={subDivision} name="subDivision" />
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
        {/* <InputFile
          name="logo"
          type="file"
          onChange={event => {
            setFieldValue('logo', event.currentTarget.files[0])
          }}
        /> */}
        <div className="flex justify-center">
          <ButtonField type="submit" addText="Registrar ahora" />
        </div>
      </div>
    </div>
  )
}
