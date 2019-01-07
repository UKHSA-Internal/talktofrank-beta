import React from 'react'
import { renderRoutes } from 'react-router-config'
import Skiplinks from '../Skiplinks/component.jsx'
import AmpHead from '../AmpHead/component.jsx'
import * as Amp from 'react-amphtml'

const AmpHtml = (props) => {
  return (
    <Amp.Html specName="html ⚡ for top-level html" lang="en" amp="amp">
      <AmpHead {...props} />
      <body>
        <Skiplinks/>
        <div id='app' className='flex-wrapper'>
          {props.children}
        </div>
      </body>
    </Amp.Html>
  )
}

export default AmpHtml
