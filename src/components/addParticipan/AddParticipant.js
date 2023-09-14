import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { FormParticipant } from './FormParticipant'
import { saveForm, uploadFile } from '../../../firebase'

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
        values.logo = await uploadFile(values.logo, values.name)
        const dataSave = await saveForm(values, 'user')
        SendEmail(values)
        resetForm()
        router.push(`completo/${dataSave}`)
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FormParticipant
            categoryTypeProp={categoryType}
            setFieldValue={setFieldValue}
          />
          {setCategoryType(values.categoryType)}
        </Form>
      )}
    </Formik>
  )
}
