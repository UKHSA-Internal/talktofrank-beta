import { connect } from 'react-redux'

import PageDrugAZ from '../../components/PageDrugAZ/component.jsx'

const mapStateToProps = (state, ownProps) => {
  if (
    state.app.azPageData &&
    state.app.azPageData.fields &&
    state.app.azPageData.fields.introText
  ) {
    return {
      ...state.app.pageData,
      introText: state.app.azPageData.fields.introText
    }
  }
  return state.app.pageData
}

export default connect(mapStateToProps)(PageDrugAZ)
