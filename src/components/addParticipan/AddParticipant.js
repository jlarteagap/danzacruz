import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { FormParticipant } from './FormParticipant'
import { saveForm } from '../../../firebase'
import { initialValues, validate } from './utils'
import { useRouter } from 'next/router'
import emailjs from '@emailjs/browser'

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')
  const router = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={async (values, { resetForm }) => {
        const dataSave = await saveForm(values, 'user')
        const dataForm = {
          to_name: values.name,
          reply_to: values.email,
          message: 'lorem ipsun Festival danzacruz'
        }

        emailjs
          .send(
            'service_ce9y3ij',
            'template_ne3495f',
            dataForm,
            '93BAteTRApolzmkNo'
          )
          .then(
            response => {
              console.log('SUCCESS!', response.status, response.text)
            },
            err => {
              console.log('FAILED...', err)
            }
          )
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
