import emailjs from '@emailjs/browser'

export const SendEmail = values => {
  const dataEmail = {
    to_name: values.name,
    reply_to: values.email,
    message: 'lorem ipsun Festival danzacruz'
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
