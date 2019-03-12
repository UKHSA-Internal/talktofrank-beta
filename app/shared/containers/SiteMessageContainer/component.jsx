import { connect } from 'react-redux'

import MessageBar from '../../components/MessageBar/component.jsx'

const mapStateToProps = (state, ownProps) => {
  if (!state.app.siteSettings) {
    return null
  }

  let messageBlock = { disabled: true }

  if (state.app.siteSettings.fields.alert) {
    const messageType = state.app.siteSettings.fields.alert.sys.contentType.sys.id
    let alwaysShowOnHomepage = messageType === 'alertDrugWarning'
    let bodyMessage = ownProps.body && alwaysShowOnHomepage
    let showPopup = (ownProps.path.pathname === '/' && !alwaysShowOnHomepage) || ownProps.path.pathname !== '/'

    if (state.app.siteSettings.fields.alert.fields) {
      messageBlock = {
        id: state.app.siteSettings.fields.alert.sys.id,
        messageType: messageType,
        message: state.app.siteSettings.fields.alert.fields.alertMessage,
        bodyMessage: bodyMessage,
        showPopup: showPopup,
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
