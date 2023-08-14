import { Formik, Form } from 'formik'
import React, { useState, useEffect } from 'react'
import { FormParticipant } from './FormParticipant'

const initialValues = {
  name: '',
  coreografy: '',
  categoryType: '',
  categoryAge: '',
  categoryGroup: '',
  modalidity: '',
  professor: '',
  phone: '',
  email: ''
}

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')
  const [categoryGroup, setCategoryGroup] = useState('')

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values.categoryType)
      }}
    >
      {({ values }) => (
        <Form>
          <FormParticipant />
          {setCategoryType(values.categoryType)}
          {setCategoryGroup(values.categoryGroup)}
        </Form>
      )}
    </Formik>
  )
}
