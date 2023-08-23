import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { FormParticipant } from './FormParticipant'
import { saveForm } from '../../../firebase'
import { initialValues, validate } from './utils'
import { useRouter } from 'next/router'

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')
  const router = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={async (values, { resetForm }) => {
        const dataSave = await saveForm(values, 'user')
        resetForm()
        router.push(`completo/${dataSave}`)
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
