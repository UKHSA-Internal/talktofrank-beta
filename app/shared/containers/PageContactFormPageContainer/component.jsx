import { connect } from 'react-redux'

import PageContactForm from '../../components/PageContactForm/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageContactForm)
