'use client'

import {
  ButtonField,
  InputField,
  InputFile,
  SelectField
} from '@/components/form/Fields'
import { Form, Formik } from 'formik'
import { initialValues } from './utils'
import { saveForm, uploadFile } from '@/lib/firebase'
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
          values.logo = await uploadFile(values.logo, values.company, 'ads')
          await saveForm(values, 'ads')
          resetForm()
        }}
      >
        {({ values, setFieldValue }) => (
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
            <InputFile
              type="file"
              name="logo"
              onChange={e => {
                setFieldValue('logo', e.currentTarget.files[0])
              }}
            />
            <ButtonField type="submit" addText="Agregar" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
