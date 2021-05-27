import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon/component'
const Attribution = props => {
  const iconArrow = {
    label: 'Learn more about this artwork',
    url: '/ui/svg/arrow-right.svg'
  }
  return (
    <div className="attribution">
      <p className="attribution__title">Artwork by Page Waltz.</p>
      {/* @todo - add attribution link */}
      <a className="attribution__link" href="#">
        {/* @todo - improve accessibility of link (description) */}
        <span>Learn more</span>
      </a>
    </div>
  )
}

export default Attribution
