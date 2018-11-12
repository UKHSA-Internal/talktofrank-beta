import { connect } from 'react-redux'
import PageContactForm from '../../components/PageContactForm/component.jsx'
import { submitForm } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    submitForm: (data) => {
      dispatch(submitForm(data, 'sendSupportEnquiry'))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContactForm)
