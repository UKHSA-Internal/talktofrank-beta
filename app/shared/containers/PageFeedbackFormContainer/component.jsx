import { connect } from 'react-redux'
import PageFeedbackForm from '../../components/PageFeedbackForm/component.jsx'
import { submitForm } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    submitForm: (data) => {
      dispatch(submitForm(data, 'sendFeedback'))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PageFeedbackForm)
