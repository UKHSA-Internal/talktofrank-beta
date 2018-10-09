import React from 'react'
import Nav from '../Nav/component.jsx'
import Divider from '../Divider/component.jsx'
import { footer, footerUtility, footerButton } from '../../fixtures/navigation.js'

const Footer = props => {
  return (
    <footer className='footer' role='contentinfo'>
      <section className='footer__inner'>
        <Nav id='footer-phone' className='displaced-top' navigation={footerButton}/>
        <Nav className='navbar-expand navbar-raised' id='navigation-footer' navigation={footer}/>
        <Divider className='hr--inverse'/>
        <Nav className='navbar-expand navbar-muted' id='navigation-footer-utility' navigation={footerUtility}/>
      </section>
    </footer>
  )
}
export default Footer
