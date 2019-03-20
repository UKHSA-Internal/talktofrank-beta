import { connect } from 'react-redux'

import MessageBar from '../../components/MessageBar/component.jsx'

const mapStateToProps = (state, ownProps) => {
  if (!state.app.siteSettings) {
    return null
  }

  let messageBlock = { disabled: true }

  if (state.app.siteSettings.fields.alert && state.app.siteSettings.fields.alert.fields) {
    let disabled = false
    const position = typeof ownProps.body !== 'undefined' ? 'body' : 'footer'
    const messageType = state.app.siteSettings.fields.alert.sys.contentType.sys.id
    if (messageType === 'alertDrugWarning') {
      disabled = ownProps.path.pathname === '/' && position === 'footer'
    } else {
      disabled = position === 'body'
    }

    if (state.app.siteSettings.fields.alert.fields) {
      messageBlock = {
        id: state.app.siteSettings.fields.alert.sys.id,
        messageType: messageType,
        message: state.app.siteSettings.fields.alert.fields.alertMessage,
        position: typeof ownProps.body !== 'undefined' ? 'body' : 'footer',
        disabled: disabled,
        alertButtonLabel: false,
        alertButtonText: false,
        url: false,
        delay: 0
      }

      if (state.app.siteSettings.fields.alert.fields.alertMessageLink) {
        if (messageType === 'alertDrugWarning') {
          const linkType = state.app.siteSettings.fields.alert.fields.alertMessageLink.sys.contentType.sys.id.toLowerCase()
          messageBlock.url = `/${linkType}/${state.app.siteSettings.fields.alert.fields.alertMessageLink.fields.slug}`
        } else if (messageType === 'alertSiteMessage') {
          messageBlock.url = state.app.siteSettings.fields.alert.fields.alertMessageLink
        }
      }

      if (state.app.siteSettings.fields.alert.fields.delay) {
        messageBlock.delay = state.app.siteSettings.fields.alert.fields.delay
      }

      if (state.app.siteSettings.fields.alert.fields.alertButtonLabel) {
        messageBlock.alertButtonLabel = state.app.siteSettings.fields.alert.fields.alertButtonLabel
      }

      if (state.app.siteSettings.fields.alert.fields.alertButtonText) {
        messageBlock.alertButtonText = state.app.siteSettings.fields.alert.fields.alertButtonText
      }
    }
  }
  return messageBlock
}

export default connect(mapStateToProps)(MessageBar)
