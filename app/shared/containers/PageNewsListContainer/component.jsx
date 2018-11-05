import { connect } from 'react-redux'

import PageNewsList from '../../components/PageNewsList/component.jsx'
import { fetchNewsList } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchNewsList: (page) => {
      dispatch(fetchNewsList(page))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNewsList)
