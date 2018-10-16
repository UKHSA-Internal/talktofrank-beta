import React from 'react'
import Footer from '../Footer/component'
import GA from '../GoogleAnalytics/component'
import Heading from '../Heading/component'
import Longform from '../Longform/component'
import Masthead from '../Masthead/component'
import Main from '../Main/component'
import Accent from '../Accent/component'

const PageNotFound = () => {
  const text = '<p>If you entered a web address please check it was correct.</p>' +
    '<p>You can also <a href="/search">search Talk to Frank</a> or ' +
    '<a href="/">browse from the homepage</a> to find the information you need.</p>'

  return (
    <React.Fragment>
      <Masthead path={'no-match'}/>
      <Main className='main--full-width'>
        <Accent>
          <Heading type='h2' text='Page not found' />
          <Longform text={text} />
        </Accent>
      </Main>
      <Footer/>
      <GA/>
    </React.Fragment>
  )
}

export default PageNotFound
