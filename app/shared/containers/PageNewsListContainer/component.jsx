import { connect } from 'react-redux'

import PageNewsList from '../../components/PageNewsList/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageNewsList)
