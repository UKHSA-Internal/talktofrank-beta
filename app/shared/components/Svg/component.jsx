import React from 'react'
import PropTypes from 'prop-types'

const Svg = props => {
  return (
    <img src={props.url} className={props.className} alt={props.alt} role='presentation'/>
  )
}

Svg.defaultProps = {
  className: null,
  alt: ''
}

export default Svg
