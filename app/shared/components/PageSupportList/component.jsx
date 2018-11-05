import React from 'react'
// import { Link } from 'react-router-dom'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Accent from '../Accent/component.jsx'
import Article from '../Article/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'

export default class PageSupportList extends React.PureComponent {
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
        }
      ]
    }
    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='Find support near you'/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-10 offset-sm-1'>
              <p className='lead'>Find details of local and national services that provide counselling and treatment in England.</p>
              <p><a href='#'>What drug treatment is like?</a></p>
              <Form>
                <FormGroup name='' label='' id=''/>
                <Select {...supportOptions}/>
              </Form>
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}
