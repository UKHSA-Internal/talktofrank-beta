import React from 'react'
import { renderRoutes } from 'react-router-config'
import AmpHtml from '../AmpHtml/component'

const AmpHTMLWrapper = ({route, ...otherProps}) => (
  <AmpHtml {...otherProps}>
    {renderRoutes(route.routes)}
  </AmpHtml>
)

export default AmpHTMLWrapper
