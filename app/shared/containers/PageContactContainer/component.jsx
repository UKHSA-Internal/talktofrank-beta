import { connect } from 'react-redux'

import PageContact from '../../components/PageContact/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageContact)
