import React from 'react'
import Nav from '../Nav/component.jsx'
import Divider from '../Divider/component.jsx'
import { footer, footerUtility, footerButton } from '../../fixtures/navigation.js'

const Footer = props => {
  return (
    <footer className='footer'>
      <section className='footer__inner'>
        <Nav role={null} className='displaced-top' navigation={footerButton} visible='true'/>
        <Nav role={null} className='navbar-expand navbar-raised' navigation={footer} visible='true'/>
        <Divider className='hr--inverse'/>
        <Nav role={null} className='navbar-expand navbar-muted' navigation={footerUtility} visible='true'/>
      </section>
    </footer>
  )
}
export default Footer
