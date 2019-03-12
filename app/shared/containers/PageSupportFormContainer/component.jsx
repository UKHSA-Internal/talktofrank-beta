import { connect } from 'react-redux'

import PageSupportForm from '../../components/PageSupportForm/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageSupportForm)
