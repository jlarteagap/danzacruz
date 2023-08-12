import { Formik, Form, useFormikContext } from 'formik'
import React from 'react'
import { FormParticipant } from './FormParticipant'

const initialValues = {
  name: '',
  coreografy: '',
  categoryType: 'General',
  categoryAge: '',
  categoryGroup: 'Grupo',
  modalidity: '',
  professor: '',
  phone: '',
  email: ''
}

export const AddParticipant = () => {
  const { values } = useFormikContext()
  console.log(values)
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => (
        <Form>
          <FormParticipant />
        </Form>
      )}
    </Formik>
  )
}
