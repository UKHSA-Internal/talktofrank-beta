import { config } from 'config'
console.log(config)
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const mailgunTransport = require('../../lib/mailgun-transport')
const bodyParser = require('body-parser')
const {celebrate, Joi, isCelebrate} = require('celebrate')
const jsonParser = bodyParser.json()

const joiOptions = {
  abortEarly: false
}

const transports = {
  mailgun: mailgunTransport
}

const mailTransportFactory = () => {
  let emailConfig = config[config.email.transport]

  if (transports[config.email.transport]) {
    emailConfig = transports[config.email.transport](emailConfig)
  }

  return nodemailer.createTransport(emailConfig)
}

const supportEnquirySchema = {
  body: Joi.object().keys({
    nickname: Joi.string().required().error(() => 'Enter a nickname'),
    email: Joi.string().email().required().error(() => 'Enter a valid email address'),
    ageRange: Joi.string().allow('').default('Undisclosed'),
    gender: Joi.string().valid(['Male', 'Female', 'Undisclosed', 'Other']),
    message: Joi.string().required().max(500).error(() => 'Enter your message')
  })
}

router.post('/sendSupportEnquiry', [jsonParser, celebrate(supportEnquirySchema, joiOptions)], async (req, res, next) => {
  let emailResponse

  const transporter = mailTransportFactory()
  const contactConfig = config.serco.contact
  console.log(config)
  let message = {
    to: config.serco.contact.to,
    from: `${req.body.nickname} <${req.body.email}>`,
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

const feedbackSchema = {
  body: Joi.object().keys({
    subject: Joi.string().required().max(100).error(() => 'Enter a subject'),
    feedback: Joi.string().required().max(500).error(() => 'Enter feedback')
  })
}
router.post('/sendFeedback', [jsonParser, celebrate(feedbackSchema, joiOptions)], async (req, res, next) => {
  let emailResponse

  const transporter = mailTransportFactory()
  const contactConfig = config.serco.feedback

  let message = {
    to: config.serco.feedback.to,
    from: `"${config.serco.feedback.fromName}" <${config.serco.feedback.from}>`,
    subject: `${config.serco.feedback.subjectPrefix}: ${req.body.subject}`,
    html: req.body.feedback
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

  let msg = err.message || err.stack || err.name || 'General error'

  if (config.sentry.logErrors) {
    Sentry.captureException(err)
  }

  if (isCelebrate(err)) {
    let response = err.details.map((item) => {
      return {
        message: item.message,
        field: item.context.key
      }
    })

    res.status(400).json(response)
  }

  res.status(status)
    .json({
      error: msg
    })
})

export default router
