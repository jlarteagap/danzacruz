import { Formik, Form } from 'formik'
import React from 'react'
import { FormParticipant } from './FormParticipant'

export const AddParticipant = () => {
  return (
    <Formik>
      <Form>
        <FormParticipant />
      </Form>
    </Formik>
  )
}
