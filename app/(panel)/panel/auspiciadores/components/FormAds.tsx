'use client'

import {
  ButtonField,
  InputField,
  InputFile,
  SelectField
} from '@/components/form/Fields'
import { Form, Formik } from 'formik'
import { initialValues } from './utils'

const selectAds = [
  {
    value: 'Auspiciador',
    name: 'Auspiciador'
  },
  {
    value: 'Colaborador',
    name: 'Colaborador'
  },
  {
    value: 'Apoyo',
    name: 'Apoyo'
  }
]

export default function FormAds() {
  return (
    <div className="mt-10">
      <Formik
        initialValues={initialValues}
        // validationSchema={validate}
        onSubmit={async (values, { resetForm }) => {
          console.log(values)
        }}
      >
        {({ values }) => (
          <Form>
            <InputField
              label="Nombre de la empresa o organización"
              type="text"
              name="company"
              placeholder="Agregar nomnbre auspiciador"
            />
            <SelectField
              label="Tipo de auspiciador"
              name="type"
              type="select"
              options={selectAds}
            />
            <InputFile type="file" name="logo" />
            <ButtonField type="submit" addText="Agregar" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
