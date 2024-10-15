import * as Yup from 'yup'

export const modalidad = [
  { value: 'Ballet Clásico', name: 'Ballet Clásico' },
  {
    value: 'Danza Moderna y Contemporánea',
    name: 'Danza Moderna y Contemporánea'
  },
  { value: 'Jazz', name: 'Jazz' },
  { value: 'Musical', name: 'Musical' },
  { value: 'Tap Dance', name: 'Tap Dance' },
  { value: 'Street Dance', name: 'Street Dance' },
  { value: 'Bailes Tropicales y Salón', name: 'Bailes Tropicales y Salón' },
  { value: 'Folk de Raíz', name: 'Folklore de Raíz' },
  { value: 'Modalidad Libre', name: 'Modalidad Libre' },
  {
    value: 'Folk Nacional e Internacinal',
    name: 'Folklore Nacional e Internacinal'
  },
  {
    value: 'Folk Nacional e Internacinal de Proyección',
    name: 'Folklore Nacional e Internacinal de Proyección'
  },
  { value: 'Danzas populares', name: 'Danzas populares' },
  { value: 'K Pop', name: 'K Pop' },
  { value: 'Retro Dance', name: 'Retro Dance' },
  { value: 'Cosplay', name: 'Cosplay' }
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
    value: 'Mayores',
    name: 'Mayores'
  }
]
export const category = ['General', 'Colegios o Universidad']
export const subDivision = [
  'Solo',
  'Duo',
  'trio',
  'Grupo pequeño',
  'Grupo grande'
]

export const initialValues = {
  name: '',
  coreografy: '',
  category: 'General',
  division: '',
  subDivision: 'Grupo pequeño',
  modalidity: '',
  professor: '',
  phone: '',
  email: '',
  logo: ''
}

const MAX_FILE_SIZE = 602400 // 500KB

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'webp']
}

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  )
}
export const validate = Yup.object().shape({
  name: Yup.string().required('Introduzca un nombre del participante o grupo'),
  coreografy: Yup.string()
    .required('Introduzca el nombre de la coreografía')
    .min(4, 'Se necesita mínimo 5 carácteres'),
  category: Yup.string().required('Seleccione una categoría'),
  division: Yup.string().required('Seleccione una categoría'),
  subDivision: Yup.string().required('Seleccione una categoridad'),
  modalidity: Yup.string().required('Seleccione una modalidad del festival'),
  professor: Yup.string()
    .required('Introduzca un nombre del coreográfo o profesor responsable')
    .min(5, 'Minimo debe haber 5 carácteres'),
  phone: Yup.number('Introduzca solo números')
    .required('Necesitamos un número de teléfono')
    .min(5, 'Necesitamos un número de telefono valido'),
  email: Yup.string()
    .email('Correo no válido')
    .required('Necesitamos un correo electrónico'),

  logo: Yup.mixed()
    .test('is-valid-type', 'No es una tipo de imagen valida', value =>
      isValidFileType(value && value.name.toLowerCase(), 'image')
    )
    .test(
      'is-valid-size',
      'Pero maximo de imagen permitido es de 600Kb',
      value => value && value.size <= MAX_FILE_SIZE
    )
})
