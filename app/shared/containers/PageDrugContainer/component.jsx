import { connect } from 'react-redux'

import Page from '../../components/PageDrug/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(Page)
