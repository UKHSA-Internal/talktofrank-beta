import React from 'react'
import { renderRoutes } from 'react-router-config'
import Skiplinks from '../Skiplinks/component.jsx'
import Scripts from '../Scripts/component.jsx'
import Head from '../Head/component.jsx'

const Html = (props) => {
  const schemaTags = {
    '@context': 'http://schema.org',
    '@type': 'GovernmentOrganization',
    'name': 'FRANK',
    'alternateName': 'Talk to Frank',
    'url': 'https://www.talktofrank.com',
    'logo': 'https://www.talktofrank.com/ui/svg/logo-frank--alt.svg',
    'email': 'frank@talktofrank.com',
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+44300 123 6600',
        'contactType': 'Emergency'
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+44300 123 1099',
        'contactType': 'Emergency',
        'contactOption': ['HearingImpairedSupported']
      }
    ]
  }
  return (
    <html lang='en' className='has-hover'>
      <Head {...props} />
      <body>
        <Skiplinks/>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaTags) }}/>
        <div id='app' className='flex-wrapper'>
          {props.children}
        </div>
        <script dangerouslySetInnerHTML={{__html: `window.$REDUX_STATE=${JSON.stringify(props.initialState)}`}} />
        <Scripts cacheBusterTS={props.cacheBusterTS} />
      </body>
    </html>
  )
}

export default Html
