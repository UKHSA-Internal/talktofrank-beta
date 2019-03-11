import { connect } from 'react-redux'

import DrugList from '../../components/PageDrugAZ/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

export default connect(mapStateToProps)(DrugList)
