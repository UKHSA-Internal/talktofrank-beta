import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import FormHint from '../FormHint/component.jsx'
import Button from '../Button/component.jsx'
import Accent from '../Accent/component.jsx'
import Anchor from '../Anchor/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'
import Textarea from '../Textarea/component.jsx'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contentFulFactory } from '../../contentful'

export default class PageContactForm extends React.PureComponent {
  render () {
    const message = {
      label: 'Your message',
      id: 'Your-message',
      name: 'message'
    }

    const age = {
      label: 'Your age ',
      supporting: '(optional)',
      selected: '',
      name: 'age-options',
      id: 'age-options',
      options: [
        {
          label: 'Please select',
          value: ''
        },
        {
          label: 'Under 11',
          value: 'Under 11'
        },
        {
          label: '11 - 14',
          value: '11 - 14'
        },
        {
          label: '15 - 18',
          value: '15 - 18'
        },
        {
          label: '19 - 25',
          value: '19 - 25'
        },
        {
          label: '26 - 35',
          value: '26 - 35'
        },
        {
          label: '36 - 45',
          value: '36 - 45'
        },
        {
          label: '46 - 55',
          value: '46 - 55'
        },
        {
          label: '56 - 65',
          value: '56 - 65'
        },
        {
          label: '66 - 75',
          value: '66 - 75'
        },
        {
          label: '75+',
          value: '75+'
        }
      ]
    }

    const gender = {
      label: 'Your gender ',
      supporting: '(optional)',
      name: 'gender-options',
      id: 'gender-options',
      options: [
        {
          label: 'Please select',
          value: ''
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Other',
          value: 'other'
        },
        {
          label: 'Prefer not to say',
          value: 'not-saying'
        }
      ]
    }

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='Contact us via email'/>
        </Accent>
        <Main className='main--muted main--full-width'>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-sm-7 col-md-6 offset-md-2'>

                {this.props.fields.body &&
    	    	      <div dangerouslySetInnerHTML={{
        	    	    __html: documentToHtmlString(this.props.fields.body, contentFulFactory())
              		}}/>
            	  }

                <Form className='spacing-bottom--large'>
                  <FormGroup type='email' className='form-control--reversed form-control--large' name='your-email' label='Your email' id='email-please' type='email'/>
                  <Select {...age} className='form-control--reversed form-control--large'/>
                  <Select {...gender} className='form-control--reversed form-control--large'/>
                  <Textarea {...message}/>
                  <Button className='btn--primary'>
                    Send message
                  </Button>
                </Form>
              </GridCol>
              <GridCol className='col-12 col-sm-5 col-md-4'>
                <Heading className='h4' text='What happens next?'/>
                <p>You’ll receive a reply from <Anchor label='Send an email to frank@talktofrank.com' href='mailto:frank@talktofrank.com' text='frank@talktofrank.com'/> and the subject line won't have your question in it.</p>
                <p>FRANK will only reply to you - you'll never receive emails you didn't ask for.</p>
                <p>If you're worried someone’s reading your messages, you can always call us or set up an alternative email account.</p>
                <p>Learn more about our <a href='/privacy_policy'>privacy policy</a></p>
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}
