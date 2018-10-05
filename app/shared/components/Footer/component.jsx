import React from 'react'
import Nav from '../Nav/component.jsx'
import { footer, footerUtility, footerButton } from '../../fixtures/navigation.js'
import ReactGA from 'react-ga'

const Footer = props => {
  return (
    <footer className='footer' role='contentinfo'>
      <section className='footer__inner'>
        <Nav id='footer-phone' className='displaced-top' navigation={footerButton}/>
        <Nav className='navbar-expand-sm' id='navigation-footer' navigation={footer}/>
        <Nav className='navbar-expand-sm navbar-muted' id='navigation-footer-utility' navigation={footerUtility}/>
      </section>
    </footer>
  )
}
export default Footer
