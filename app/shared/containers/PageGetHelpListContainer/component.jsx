import { connect } from 'react-redux'

import PageGetHelpList from '../../components/PageGetHelpList/component.jsx'
const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(PageGetHelpList)
