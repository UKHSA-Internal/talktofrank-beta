import React from 'react'
import classNames from 'classnames'
import SplitText from '../SplitText/component.jsx'
import Picture from '../Picture/component.jsx'
import Attribution from '../Attribution/component.jsx'
const Hero = props => {
  let classes = classNames('hero', props.className)

  return (
    <section className={classes}>
      {props.images && <Picture {...props.images} />}
      <div className="constrain-narrow">
        <div className="hero__inner hero__inner--constrained">
          <SplitText {...props.heading} />
        </div>
        <Attribution />
      </div>
    </section>
  )
}

export default Hero
