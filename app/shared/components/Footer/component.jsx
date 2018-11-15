import React from 'react'
import Nav from '../Nav/component.jsx'
import Divider from '../Divider/component.jsx'
import { footer, footerUtility, footerButton } from '../../fixtures/navigation.js'

const Footer = props => {
  return (
    <footer className='footer' role='contentinfo'>
      <section className='footer__inner'>
        <Nav className='displaced-top' navigation={footerButton}/>
        <Nav role={null} className='navbar-expand navbar-raised' navigation={footer}/>
        <Divider className='hr--inverse'/>
        <Nav role={null} className='navbar-expand navbar-muted' navigation={footerUtility}/>
      </section>
    </footer>
  )
}
export default Footer
