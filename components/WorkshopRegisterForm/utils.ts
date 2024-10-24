import * as Yup from 'yup'

export const initialValues = {
  name: '',
  email: '',
  phone: '',
  workshop: '',
  year: ''
}

export const Workshops = [
  {
    value: 'Ritmos Urbanos (Nicolas Blanzari)',
    name: 'Ritmos Urbanos (Nicolas Blanzari)'
  }
]

export const validate = Yup.object().shape({
  name: Yup.string()
    .required('Introduzca un Nombre y Apellido completo')
    .min(4),
  workshop: Yup.string().required('Seleccione una categoría'),
  phone: Yup.number()
    .required('Necesitamos un número de teléfono')
    .min(5, 'Necesitamos un número de telefono valido'),
  email: Yup.string()
    .email('Correo no válido')
    .required('Necesitamos un correo electrónico')
})
