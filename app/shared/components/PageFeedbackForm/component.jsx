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

export default class PageFeedbackForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      comments: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitForm(this.state)
  }

  render() {
    console.log("TEST")
    console.log(this.props)
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 inverted spacing-left spacing--single' text={this.props.title} />
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

              
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label class="form-label" for="subject">Subject</label>
                  <input class="form-control" id="subject" type="text" name="subject" type="text" value={this.state.subject} onChange={this.handleChange} />
                </div>
                <div class="form-group">
                  <label class="form-label" for="comments">Comments</label>
                  <textarea class="form-control" id="comments" name="comments" value={this.state.comments} onChange={this.handleChange} />
                </div>
                <input type="submit" value="Submit" />
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
