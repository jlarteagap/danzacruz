'use client'
import { Form, Formik } from 'formik'
import {
  InputField,
  SelectField,
  ButtonField
} from 'src/components/form/Fileds'
import { initialValues, Workshops, validate } from './utils'
import { saveForm } from '@/lib/firebase'
import { toast } from 'sonner'

const currentTime = new Date()
const year = currentTime.getFullYear()

export default function WorkshopRegisterForm() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={async (values, { resetForm }) => {
          try {
            values.year = year.toString()
            await saveForm(values, 'workshops')
            toast('Registro completo', {
              description: `Tu registro a sido realizado exitosamente.`
            })
            resetForm()
          } catch (error) {
            console.error('Error saving form:', error)
          }
        }}
      >
        {({ values }) => (
          <Form>
            <SelectField
              label="Seleccionar taller"
              name="workshop"
              type="select"
              options={Workshops}
            />
            <InputField label="Nombre y Apellido" type="text" name="name" />
            <InputField label="Correo Electronico" type="email" name="email" />
            <InputField label="Telefono" type="text" name="phone" />

            <div className="flex justify-center">
              <ButtonField type="submit" addText="Registrar ahora" />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
