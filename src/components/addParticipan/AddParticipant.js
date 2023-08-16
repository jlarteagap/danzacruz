import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { FormParticipant } from './FormParticipant'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
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
