import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Footer from '../Footer/component.jsx'
import Hero from '../Hero/component.jsx'
import MatomoAnalytics from '../MatomoAnalytics/component.jsx'

const PageServerError = () => {
  let hero = {
    heading: {
      wrapper: 'h2',
      text: 'Server error :(',
      highlight: []
    },
    url: '/',
    images: {
      400: '/ui/img/hero/hero-small__323x310.jpg',
      600: '/ui/img/hero/hero-medium__882x481.jpg',
      1200: '/ui/img/hero/hero-large__1445x460.jpg'
    }
  }
  return (
    <React.Fragment>
      <Masthead path={{ pathname: 'error' }}/>
      <Hero {...hero}/>
      <Footer />
      <MatomoAnalytics />
    </React.Fragment>
  )
}

export default PageServerError
