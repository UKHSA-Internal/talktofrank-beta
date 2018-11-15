import { connect } from 'react-redux'

import PageGeneral from '../../components/PageGeneral/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageGeneral)
