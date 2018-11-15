import { connect } from 'react-redux'

import PageGetHelpPage from '../../components/PageGetHelpPage/component.jsx'
const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageGetHelpPage)
