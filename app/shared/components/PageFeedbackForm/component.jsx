import React from 'react'
import Accent from '../Accent/component'
import Masthead from '../Masthead/component'
import Divider from '../Divider/component'
import Heading from '../Heading/component'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Grid from '../Grid/component'
import GridCol from '../GridCol/component'
import Main from '../Main/component'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contentFulFactory } from '../../contentful'

const ErrorMessage = ({message}) => (
  <div className="invalid-feedback">{message}</div>
)

const ErrorSummary = ({errors}) => (
  <div>
    <h3>There is a problem</h3>
    <ul>
      {errors.map(error => (
        <li><a href={`#${error.field}`}>{error.message}</a></li>
      ))}
    </ul>
  </div>
)

export default class PageFeedbackForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      feedback: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitForm(this.state)
  }

  getErrors() {
    if (!this.props.error) {
      return []
    }

    let errors = []
    this.props.errors.forEach(error => {
      errors[error.field] = <ErrorMessage message={error.message} />
    })

    return errors
  }

  render() {
    let errors = this.getErrors()

    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 inverted spacing-left spacing--single' text={this.props.pageData.title} />
        </Accent>
        <Divider className='hr--muted' />
        <Main>
          <Grid>
            <GridCol className='col-12 col-md-8'>
              {this.props.pageData.fields.body &&
                <div dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(this.props.pageData.fields.body, contentFulFactory())
                }}/>
              }

              {this.props.error &&
                <ErrorSummary errors={this.props.errors} />
              }

              {this.props.submitted &&
                <div className="alert alert-success" role="alert">
                    Thank you for your feedback!
                </div>
              }

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="form-label" for="subject">Subject</label>
                  <input className={`form-control`} id="subject" type="text" name="subject" type="text" value={this.state.subject} onChange={this.handleChange} />
                  {errors['subject']}
                  <span>Must be less than 100 characters</span>
                </div>
                <div class="form-group">
                  <label className="form-label" for="feeback">Feedback</label>
                  <textarea className="form-control" id="feedback" name="feedback" value={this.state.feedback} onChange={this.handleChange} />
                  {errors['feedback']}
                  <span>Must be less than 500 characters</span>
                </div>
                <input type="submit" value="Submit" disabled={this.props.loading} />
              </form>

            </GridCol>
          </Grid>
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}
