import React from 'react'

const Svg = props => {
  return (
    <img
      src={props.url}
      className={props.className}
      alt={props.alt}
      role={!props.alt ? 'presentation' : ''}
    />
  )
}

Svg.defaultProps = {
  className: '',
  alt: ''
}

export default Svg
