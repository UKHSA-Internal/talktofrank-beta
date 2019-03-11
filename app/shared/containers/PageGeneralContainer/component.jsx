import { connect } from 'react-redux'

import PageGeneral from '../../components/PageGeneral/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(PageGeneral)
