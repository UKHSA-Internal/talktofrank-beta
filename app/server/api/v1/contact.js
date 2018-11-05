import { config } from 'config'

const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const mailgunTransport = require('../../lib/mailgun-transport')
const bodyParser = require('body-parser')
const { celebrate, Joi, errors } = require('celebrate');
const jsonParser = bodyParser.json()

const transports = {
  mailgun: mailgunTransport
}

const mailTransportFactory = () => {
  let emailConfig = config[config.email.transport]

  if ( transports[config.email.transport] ) {
    emailConfig = transports[config.email.transport](emailConfig)
  }

  return nodemailer.createTransport(emailConfig)
}

const supportEnquirySchema = {
  body: Joi.object().keys({
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    ageRange: Joi.string().optional().default('Undisclosed'),
    gender: Joi.string().optional().valid(['Male', 'Female']).default('Undisclosed'),
    message: Joi.string().required().max(500)
  })
}

router.post('/sendSupportEnquiry', [jsonParser, celebrate(supportEnquirySchema)], async (req, res, next) => {
  let emailResponse

  const transporter = mailTransportFactory()
  const contactConfig = config.serco.contact

  let message = {
    to: config.serco.contact.to,
    from: config.serco.contact.from,
    subject: config.serco.contact.subject,
    html: `|Age: ${req.body.ageRange}|<br />
      |Gender: ${req.body.gender}|<br />
      |Message: ${req.body.message}|`
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
