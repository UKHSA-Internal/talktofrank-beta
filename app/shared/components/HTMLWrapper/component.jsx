import React from 'react'
import { renderRoutes } from 'react-router-config'
import Html from '../Html/component'

const HTMLWrapper = ({route, ...otherProps}) => (
  <Html {...otherProps}>
    {renderRoutes(route.routes)}
  </Html>
)

export default HTMLWrapper
