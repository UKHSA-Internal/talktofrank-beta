import { connect } from 'react-redux'

import PageNotFound from '../../components/PageNoMatch/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageNotFound)
