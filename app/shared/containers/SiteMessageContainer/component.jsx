import { connect } from 'react-redux'

import MessageBar from '../../components/MessageBar/component.jsx'

const mapStateToProps = (state, ownProps) => {

  if (!state.app.siteSettings) {
    return null
  }

  let messageBlock = false
  let alwaysShowOnHomepage = state.app.siteSettings.fields.alert.fields.alwaysShowOnHomepage
  let bodyMessage = ownProps.body && alwaysShowOnHomepage
  let warningBar = ownProps.path.pathname === '/' && !alwaysShowOnHomepage || ownProps.path.pathname !== '/'

  if (state.app.siteSettings.fields.alert.fields) {
    messageBlock = {
      id: state.app.siteSettings.fields.alert.sys.id,
      message: state.app.siteSettings.fields.alert.fields.alertMessage,
      bodyMessage: bodyMessage,
      warningBar: warningBar,
      url: false
    }

    if (state.app.siteSettings.fields.alert.fields.alertMessageLink) {
      const linkType = state.app.siteSettings.fields.alert.fields.alertMessageLink.sys.contentType.sys.id.toLowerCase()
      messageBlock.url = `/${linkType}/${state.app.siteSettings.fields.alert.fields.alertMessageLink.fields.slug}`
    }
  }

  return messageBlock
}

export default connect(mapStateToProps)(MessageBar)