import React from 'react'
import * as Amp from 'react-amphtml'

const AmpLogo = props => {
  return (
    <div className='logo'>
      <a href='/' className='logo__link' title='Homepage'>
        <Amp.AmpImg
          specName='default'
          src={props.url}
          className={props.className || null}
          alt={props.alt || ''}
          role='presentation'
          width='300'
          height='72'>
        </Amp.AmpImg>
      </a>
    </div>
  )
}

export default AmpLogo
