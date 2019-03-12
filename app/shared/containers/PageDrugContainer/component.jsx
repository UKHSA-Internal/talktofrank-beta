import { connect } from 'react-redux'

import PageDrug from '../../components/PageDrug/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageDrug)
