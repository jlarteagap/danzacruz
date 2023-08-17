import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { FormParticipant } from './FormParticipant'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { initialValues, validate } from './utils'

export const AddParticipant = () => {
  const [categoryType, setCategoryType] = useState('')

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={async values => {
        try {
          const docRef = await addDoc(collection(db, 'users'), {
            id: values.email,
            ...values
          })
          console.log('Document written with ID: ', docRef.id)
        } catch (e) {
          console.error('Error adding document: ', e)
        }
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
