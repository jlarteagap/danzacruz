import emailjs from '@emailjs/browser'
import { Certificade } from '../pdf/certificade'
import { pdf } from '@react-pdf/renderer'

export const SendEmail = values => {
  const certificade = <Certificade name={values.name} />
  const attachCertificade = pdf(certificade).toBlob()
  const transformedAttach = attachCertificade.toDataURL()

  const dataEmail = {
    to_name: values.name,
    reply_to: values.email,
    content: transformedAttach
  }

  emailjs
    .send('service_ce9y3ij', 'template_ne3495f', dataEmail, '93BAteTRApolzmkNo')
    .then(
      response => {
        console.log('SUCCESS!', response.status, response.text)
      },
      err => {
        console.log('FAILED...', err)
      }
    )
}
