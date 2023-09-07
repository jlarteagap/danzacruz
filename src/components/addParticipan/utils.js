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
  { value: 'Folk Departamental', name: 'Folklore Departamental' },
  { value: 'Folk Nacional', name: 'Folklore Nacional' },
  { value: 'Folk Internacional', name: 'Folklore Internacional' },
  { value: 'Folk Etnico y de Raíz', name: 'Folklore Etnico y de Raíz' },
  { value: 'K Pop', name: 'K Pop' }
]

export const colegios = [
  {
    value: 'Pre-infantil',
    name: 'Pre-infantil'
  },
  {
    value: 'Infantil',
    name: 'Infantil'
  },
  {
    value: 'Juvenil',
    name: 'Juvenil'
  }
]
export const general = [
  {
    value: 'Pre-infantil',
    name: 'Pre-infantil'
  },
  {
    value: 'Infantil',
    name: 'Infantil'
  },
  {
    value: 'Juvenil',
    name: 'Juvenil'
  },
  {
    value: 'Adulto',
    name: 'Adulto'
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
