import React from 'react'
import { renderRoutes } from 'react-router-config'
import Skiplinks from '../Skiplinks/component.jsx'
import Scripts from '../Scripts/component.jsx'
import Head from '../Head/component.jsx'

const Html = ({initialState, cacheBusterTS, children}) => {
  return (
  <html lang='en' className='has-hover'>
    <Head {...initialState.app.pageData} />
    <body>
      <Skiplinks/>
      <div id='app' className='flex-wrapper'>
        {children}
      </div>
      <script dangerouslySetInnerHTML={{__html: `window.$REDUX_STATE=${JSON.stringify(initialState)}`}} />
      <Scripts cacheBusterTS={cacheBusterTS} />
    </body>
  </html>
  )
}

export default Html
