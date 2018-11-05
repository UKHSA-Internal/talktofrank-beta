import { connect } from 'react-redux'

import PageSupportList from '../../components/PageSupportList/component.jsx'
import { fetchSupportList } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.app
}
// @joel reinstate when the backend is in place
// const mapDispatchToProps = (dispatch) => {
//   return ({
//     fetchSupportList: (page) => {
//       dispatch(fetchSupportList(page))
//     }
//   })
// }

export default connect(mapStateToProps /*, mapDispatchToProps*/)(PageSupportList)
