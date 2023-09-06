import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { FormParticipant } from './FormParticipant'
import { saveForm } from '../../../firebase'
import { initialValues, validate } from './utils'
import { useRouter } from 'next/router'
import { SendEmail } from '../email/sendEmail'

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')
  const router = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={async (values, { resetForm }) => {
        const dataSave = await saveForm(values, 'user')
        SendEmail(values)
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
