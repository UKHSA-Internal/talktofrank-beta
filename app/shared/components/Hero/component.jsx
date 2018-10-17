import React from 'react'
import classNames from 'classnames'
import SplitText from '../SplitText/component.jsx'
import Picture from '../Picture/component.jsx'

const Hero = props => {
  let classes = classNames('hero', props.className, props.modifiers)

  return (
    <section className={classes}>
      {props.images && <Picture {...props.images}/>}
      <div className='constrain-narrow'>
        <div className='hero__inner hero__inner--constrained'>
          <SplitText {...props.heading} />
        </div>
      </div>
    </section>
  )
}

export default Hero
