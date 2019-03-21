import { connect } from 'react-redux'

import PageLiveChat from '../../components/PageLiveChat/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageLiveChat)
