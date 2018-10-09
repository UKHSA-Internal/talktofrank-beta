import React from 'react'
import classNames from 'classnames'
import SplitText from '../SplitText/component.jsx'

const Hero = props => {
  let classes = classNames('hero', props.className, props.modifiers)

  return (
    <section className={classes}>

    </section>
  )
}

export default Hero
