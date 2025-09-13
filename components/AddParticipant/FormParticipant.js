"use client";

import React from "react";
import {
  InputField,
  RadioFields,
  SelectField,
  ButtonField,
} from "../form/Fields";
import { general, modalidad, category, subDivision, colegios } from "./utils";

export const FormParticipant = ({ categoryProp, setFieldValue }) => {
  return (
    <div className='text-right'>
      <div className=''>
        <InputField
          label='Nombre del participante o agrupación *'
          type='text'
          name='name'
        />
        <InputField
          label='Nombre de la Coreografia *'
          type='text'
          name='coreografy'
        />

        <div className=''>
          <div className=''>
            <RadioFields options={category} name='category' label='Categoría' />
            <SelectField
              label='División'
              name='division'
              type='select'
              options={categoryProp === "General" ? general : colegios}
            />
          </div>
          <div className='column'>
            <RadioFields
              options={subDivision}
              name='subDivision'
              label='Subdivisión'
            />
          </div>
        </div>
        <SelectField
          label='Modalidad'
          name='modalidity'
          type='select'
          options={modalidad}
        />
        <InputField
          label='Nombre del profesor o Coreográfo *'
          type='text'
          name='professor'
        />
        <InputField
          name='song'
          type='text'
          label='Nombre de la canción o música a bailar'
        />
        <InputField
          name='notes'
          type='text'
          label='Aclarativo si es necesario sobre la modalidad'
        />
        <InputField
          name='add'
          type='text'
          label='Información adiocional que desea registrar'
        />
        {/* <InputFile
          name="logo"
          type="file"
          onChange={event => {
            setFieldValue('logo', event.currentTarget.files[0])
          }}
        /> */}
        <div className='flex justify-center'>
          <ButtonField type='submit' addText='Registrar ahora' />
        </div>
      </div>
    </div>
  );
};
