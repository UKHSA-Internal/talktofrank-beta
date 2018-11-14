import React from 'react'
import PropTypes from 'prop-types'
import Heading from '../Heading/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

const Header = props => {
  return (
    <header className={`header ${props.className}`}>
      <Grid>
        <GridCol className='col-12 col-sm-8'>
          <Heading {...props.heading}/>
        </GridCol>
        <GridCol className='col-12 col-sm-4 align-right--sm'>
          <a href={props.href} className='spacing-top--tight hidden--sm link-text'>{props.text}</a>
        </GridCol>
      </Grid>
    </header>
  )
}
Header.propTypes = {
  className: '',
  text: 'Read more'
}
export default Header
