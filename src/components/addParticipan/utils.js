import * as Yup from 'yup'

export const modalidad = [
  { value: 'Ballet Clásico', name: 'Ballet Clásico' },
  { value: 'Ballet Neo-Clásico', name: 'Ballet Neo-Clásico' },
  { value: 'Danza Moderna', name: 'Danza Moderna' },
  { value: 'Danza Contemporánea', name: 'Danza Contemporánea' },
  { value: 'Danzas Tropicales', name: 'Danzas Tropicales' },
  { value: 'Modalidad Libre', name: 'Modalidad Libre' },
  { value: 'Musical', name: 'Musical' },
  { value: 'Jazz', name: 'Jazz' },
  { value: 'Street Dance', name: 'Street Dance' },
  { value: 'Folklore Departamental', name: 'Folklore Departamental' },
  { value: 'Folklore Nacional', name: 'Folklore Nacional' },
  { value: 'Folklore Internacional', name: 'Folklore Internacional' },
  { value: 'Folklore Etnico y de Raíz', name: 'Folklore Etnico y de Raíz' },
  { value: 'K Pop', name: 'K Pop' }
]

export const colegios = [
  {
    value: 'Pre-infantil: 3 a 5 años y 11 meses',
    name: 'Pre-infantil: 3 a 5 años y 11 meses'
  },
  {
    value: 'Infantil: De 6 a 11 años y 11 meses',
    name: 'Infantil: De 6 a 11 años y 11 meses'
  },
  {
    value: 'Juvenil: De 12 a 18 años',
    name: 'Juvenil: De 12 a 18 años'
  }
]
export const general = [
  {
    value: 'Pre-infantil: 3 a 5 años y 11 meses',
    name: 'Pre-infantil: 3 a 5 años y 11 meses'
  },
  {
    value: 'Infantil: De 6 a 11 años y 11 meses',
    name: 'Infantil: De 6 a 11 años y 11 meses'
  },
  {
    value: 'Juvenil: De 12 a 17 años y 11 meses',
    name: 'Juvenil: De 12 a 17 años y 11 meses'
  },
  {
    value: 'Adulto: De 18 años en adelante',
    name: 'Adulto: De 18 años en adelante'
  }
]
export const category = ['General', 'Colegios']
export const categoryGroup = [
  'Solo',
  'Duo',
  'trio',
  'Grupo pequeño',
  'Grupo grande'
]

export const initialValues = {
  name: '',
  coreografy: '',
  categoryType: 'General',
  categoryAge: '',
  categoryGroup: 'Grupo pequeño',
  modalidity: '',
  professor: '',
  phone: '',
  email: ''
}

export const validate = Yup.object().shape({
  name: Yup.string().required('Introduzca un nombre del participante o grupo'),
  coreografy: Yup.string()
    .required('Introduzca el nombre de la coreografía')
    .min(4, 'Se necesita mínimo 5 carácteres'),
  categoryType: Yup.string().required('Seleccione una categoría'),
  categoryAge: Yup.string().required('Seleccione una categoría'),
  categoryGroup: Yup.string().required('Seleccione una categoridad'),
  modalidity: Yup.string().required('Seleccione una modalidad del festival'),
  professor: Yup.string()
    .required('Introduzca un nombre del coreográfo o profesor responsable')
    .min(5, 'Minimo debe haber 5 carácteres'),
  phone: Yup.number('Introduzca solo números')
    .required('Necesitamos un número de teléfono')
    .min(5, 'Necesitamos un número de telefono valido'),
  email: Yup.string()
    .email('Correo no válido')
    .required('Necesitamos un correo electrónico')
})
