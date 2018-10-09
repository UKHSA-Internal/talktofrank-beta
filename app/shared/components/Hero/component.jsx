import React from 'react'
import classNames from 'classnames'
import SplitText from '../SplitText/component.jsx'
import Picture from '../Picture/component.jsx'

const Hero = props => {
  let classes = classNames('hero', props.className, props.modifiers)

  return (
    <section className={classes}>
      {props.images && <figure className=''><Picture {...props.images}/></figure>}
      <div className='constrained-narrow'>
        <SplitText {...props.heading} />
      </div>
    </section>
  )
}

export default Hero
