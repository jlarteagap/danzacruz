import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { FormParticipant } from './FormParticipant'

const initialValues = {
  name: '',
  coreografy: '',
  categoryType: 'General',
  categoryAge: '',
  categoryGroup: 'Solo',
  modalidity: '',
  professor: '',
  phone: '',
  email: ''
}

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values.categoryType)
      }}
    >
      {({ values }) => (
        <Form>
          <FormParticipant categoryTypeProp={categoryType} />
          {setCategoryType(values.categoryType)}
        </Form>
      )}
    </Formik>
  )
}
