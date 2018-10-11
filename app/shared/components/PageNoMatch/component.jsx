import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Footer from '../Footer/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import Hero from '../Hero/component.jsx'

const PageNoMatch = ({content, breadcrumb}) => (
  <React.Fragment>
    <Masthead path={ { pathname: breadcrumb.url } } />
    <Hero {...content[0]} />
    <Footer />
    <GA/>
  </React.Fragment>
)

export default PageNoMatch
