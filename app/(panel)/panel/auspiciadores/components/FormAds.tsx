'use client'

import { ButtonField, InputField } from '@/components/form/Fields'
import { Form, Formik } from 'formik'
import { initialValues } from './utils'

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
            <ButtonField type="submit" classType="bg-black" addText="Agregar" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
