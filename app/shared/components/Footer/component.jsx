import React from 'react'
import Button from '../Button/component.jsx'
import Nav from '../Nav/component.jsx'
import { footer, footerUtility } from '../../fixtures/navigation.js'

const Footer = props => {
  return (
    <footer className='footer' role='contentinfo'>
      <section className='footer__inner'>
        <Nav className='nav-footer navbar-expand-sm' id='navigation-footer' navigation={footer}/>
        <Nav className='navbar-expand-sm' id='navigation-footer-utility' navigation={footerUtility}/>
      </section>
    </footer>
  )
}
export default Footer
