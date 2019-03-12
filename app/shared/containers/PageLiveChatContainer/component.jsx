import { connect } from 'react-redux'

import PageStatic from '../../components/PageLiveChat/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageStatic)
