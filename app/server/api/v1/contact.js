import { config } from 'config'

const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const mailTransportFactory = () => {
  const emailConfig = config[config.email.transport]
  return nodemailer.createTransport(emailConfig)
}

router.post('/sendSupportEnquiry', async (req, res, next) => {

  let emailResponse

  const transporter = mailTransportFactory()
  const contactConfig = config.serco.contact

  let message = {
    to: config.serco.contact.to,
    subject: config.serco.contact.subject,
    text: 'Hello to myself!',
    html:
      '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
      '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
  }

  try {
    emailResponse = await transporter.sendMail(message)
  } catch (err) {
    return next(err)
  }

  res.json(emailResponse)

})


/**
 * Error handler
 */
router.use(function (err, req, res, next) {
  let status = err.status || 500

  /* eslint-disable */
  console.log(err)
  /* eslint-enable */

  let msg = err.message || err.stack || err.name || 'General error'

  if (config.sentry.logErrors) {
    Sentry.captureException(err)
  }

  res.status(status)
    .json({
      error: msg
    })
})

export default router
