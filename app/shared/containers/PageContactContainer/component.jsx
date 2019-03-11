import { connect } from 'react-redux'

import PageStatic from '../../components/PageContact/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(PageStatic)
