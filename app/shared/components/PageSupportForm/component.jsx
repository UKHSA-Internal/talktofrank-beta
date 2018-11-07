import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Longform from '../Longform/component.jsx'
import Button from '../Button/component.jsx'
import Accent from '../Accent/component.jsx'
import Pagination from '../Pagination/component.jsx'
import ArticleSupport from '../ArticleSupport/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'

export default class PageSupportForm extends React.PureComponent {
  render () {
    const supportOptions = {
      label: 'Choose a service type',
      name: 'support-centre-options',
      id: 'support-centre-options',
      options: [
        {
          label: 'Select one',
          value: ''
        },
        {
          label: 'Aberystwith',
          value: 'aber'
        },
        {
          label: 'Tyneside',
          value: 'Tyneside'
        },
        {
          label: 'London',
          value: 'London'
        }
      ]
    }

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='Find support near you'/>
        </Accent>
        <Main className='main--muted main--full-width'>
          <Accent>
            <Grid>
              <GridCol className='col-12 col-sm-6 col-md-6 offset-md-2'>
                <p className='lead'>Find details of local and national services that provide counselling and treatment in England.</p>
                <p><a href='#'>What drug treatment is like?</a></p>
                <Form className='spacing--large'>
                  <FormGroup className='form-control--reversed form-control--large' name='support-centre-postcode' label='Please enter your full postcode' id='support-centre-postcode' placeholder=''/>
                  <Select {...supportOptions} className='form-control--reversed form-control--large'/>
                  <Button className='btn--primary'>
                    Search
                  </Button>
                  <p>If you live in Scotland please visit the <a href='#'>Scottish Drug Services website</a>. If you live in Wales please visit <a href='#'>the Dan website</a>. If you live in Northern Ireland please visit <a href='#'>the Public Health Agency</a> website.</p>
                </Form>
                <p className='lead'>This is a list of local services, and national agencies you can contact no matter where you live.</p>
                <p>Some services listed below may only be available to a certain age group, or require a referral from GP or health professional. We recommend you ring ahead first, to see if it's the most suitable choice.</p>
              </GridCol>
              <GridCol className='col-12 col-sm-6 col-md-4'>
                <Heading text={`If you don't live in England`}/>
                <ul className='list-unstyled link-list link-list--has-arrow'>
                  <li className='link-list__item'>
                  <a href='#' className='link-list__link'>Worried about a friend’s use?</a>
                  </li>
                  <li className='link-list__item'>
                  <a href='#' className='link-list__link'>Worried about a friend’s use?</a>
                  </li>
                  <li className='link-list__item'>
                  <a href='#' className='link-list__link'>Worried about a friend’s use?</a>
                  </li>
                </ul>
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
