import React from 'react'
import PropTypes from 'prop-types'

const SplitText = props => {
  // this has been reworked - grab the old one from Github history
  let Wrapper = `${props.wrapper}`
  return <Wrapper className={`heading-inline heading-inverted--inline ${props.className}`}><span dangerouslySetInnerHTML={{__html: props.text}} /></Wrapper>
}

SplitText.defaultProps = {
  wrapper: 'h2',
  className: ''
}

export default SplitText
