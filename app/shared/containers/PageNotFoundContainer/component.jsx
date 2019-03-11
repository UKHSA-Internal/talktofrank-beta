import { connect } from 'react-redux'

import PageStatic from '../../components/PageNotFound/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(PageStatic)
