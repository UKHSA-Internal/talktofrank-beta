import { connect } from 'react-redux'

import PageDrugAZ from '../../components/PageDrugAZ/component.jsx'

const mapStateToProps = (state, ownProps) => {
  console.log('state', state)
  return state.app.pageData
}

export default connect(mapStateToProps)(PageDrugAZ)
