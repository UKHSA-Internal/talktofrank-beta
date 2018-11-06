import { connect } from 'react-redux'

import PageNewsList from '../../components/PageNewsList/component.jsx'
import { fetchNewsList } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  state.app['pageNumber'] = ownProps.match.params.number ? ownProps.match.params.number : 0
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchNewsList: (page) => {
      dispatch(fetchNewsList(page))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNewsList)
