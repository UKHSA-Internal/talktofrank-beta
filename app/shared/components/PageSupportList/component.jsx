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
import Anchor from '../Anchor/component.jsx'
import Accent from '../Accent/component.jsx'
import Pagination from '../Pagination/component.jsx'
import ArticleSupport from '../ArticleSupport/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Select from '../Select/component.jsx'

export default class PageSupportList extends React.PureComponent {
  render () {
    const postcode = 'LD1 123'
    const results = [
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      },
      {
        slug: 'link-1-first',
        text: 'Something somehting drug treatment centre',
        distance: '1.2 miles',
        address: '20 Avonvale Road, Redfield, Gloucestershire, Bristol BS5 9RL',
        phone: '0117 904 4366',
        phoneRaw: '01179044366',
        email: 'enquiries@chrysalissupportedassociationltd.co.uk',
        website: 'www.chrysalissupportedassociationltd.co.uk',
        summary: 'An integrated and modified approach from within a structured safe abstinent environment offering intensive treatment and support through to resettlement with very low support...'
      }
    ]

    return (
      <React.Fragment>
        <Masthead/>
        <Accent className='accent--shallow'>
          <Heading type='h1' className='h2 spacing-left spacing--single' text='234 results returned for BS5 5UE'/>
          <Anchor className='spacing-left link-text' href='/support-near-you' text='Search again'/>
        </Accent>
        <Main>
          <Grid>
            <GridCol className='col-12 col-sm-8 offset-sm-2'>
               <ul className='list-unstyled'>
                {results && results.map((item, i) => {
                  return <ArticleSupport {...item} key={i}/>
                })}
              </ul>
              {results.length > 10 &&
                <Pagination
                  pageCount={results.length / 10}
                />
              }
            </GridCol>
          </Grid>
        </Main>
        <Footer/>
        <GA/>
      </React.Fragment>
    )
  }
}
