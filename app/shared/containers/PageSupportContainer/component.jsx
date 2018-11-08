import { connect } from 'react-redux'

import PageSupport from '../../components/PageSupport/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(PageSupport)
