// 'use client'

// import React, { useState } from 'react'
// import { Formik, Form } from 'formik'
// import { FormParticipant } from './FormParticipant'
// import { saveForm } from '../../firebase'

// import { initialValues, validate } from './utils'
// import { Loading } from '../../src/components/loading'
// import { useRouter } from 'next/navigation'
// // import { SendEmail } from '../email/sendEmail'
// const currentTime = new Date()
// const year = currentTime.getFullYear()

// const AddParticipant = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [category, setCategory] = useState('')
//   const router = useRouter()

//   return (
//     <>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validate}
//           onSubmit={async (values, { resetForm }) => {
//             setIsLoading(true)
//             values.year = year
//             // values.logo = await uploadFile(values.logo, values.name)
//             const dataSave = await saveForm(values, 'register')
//             // SendEmail(values)
//             resetForm()
//             setIsLoading(false)
//             router.push(`completo/${dataSave}`)
//           }}
//         >
//           {({ values, setFieldValue }) => (
//             <Form>
//               <FormParticipant
//                 categoryProp={category}
//                 setFieldValue={setFieldValue}
//               />
//               {setCategory(values.category)}
//             </Form>
//           )}
//         </Formik>
//       )}
//     </>
//   )
// }

// export default AddParticipant

"use client";

import { Form, Formik } from "formik";
import { useParticipantForm } from "@/hooks/useParticipantForm";
import { FormParticipant } from "./FormParticipant";

export default function AddParticipant() {
  const {
    initialValues,
    validate,
    handleSubmit,
    isLoading,
    category,
    setCategory,
  } = useParticipantForm();

  if (isLoading) return "Cargando...";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form aria-labelledby='form-title' noValidate>
          <FormParticipant
            categoryProp={category}
            setFieldValue={setFieldValue}
          />
          {/* sincroniza categoría */}
          {setCategory(values.category)}
        </Form>
      )}
    </Formik>
  );
}
