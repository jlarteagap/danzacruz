import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { FormParticipant } from './FormParticipant'
import { saveForm } from '../../../firebase'
import { initialValues, validate } from './utils'

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={async (values, { resetForm }) => {
        const dataSave = await saveForm(values, 'user')
        console.log(dataSave)
        resetForm()
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
