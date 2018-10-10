import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Nav from '../Nav/component.jsx'
import Divider from '../Divider/component.jsx'
import Accent from '../Accent/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'

const DrugList = props => {
  const limit = 4
  const initialLetter = props.list.map(val => {
    return {
      label: val.group,
      url: '#' + val.group,
      tracking: {
        category: 'A-Z list nav',
        action: 'Link click',
        label: val.group
      }
    }
  })

  return (
    <React.Fragment>
      <Masthead path={props.location}/>
      <Accent>
        <Heading type='h1' className='h2 inverted' text='Drugs A to Z'/>
        <Nav navigation={initialLetter} className='navbar-expand navbar-list'/>
      </Accent>
      <Divider className='hr--muted' />
      <Main>
        <Grid>
          <GridCol className='col-12 col-sm-8 offset-sm-2'>
            <ul className='list-unstyled' role='list'>
              {props.list.map((val, i) => {
                return (
                  <li id={val.group} key={'outer' + i}>
                    <Heading text={val.group} modifiers='display-4 pink spacing-top--large'/>
                    <ul className='list-unstyled'>
                    {val.values.map((v, index) => {
                      let synonyms
                      let name = v.parent ? v.name : <span className='inverted'>{v.name}</span>
                      let realName = v.parent ? <span>Real name: <strong>{v.parent}</strong></span> : null

                      if (v.synonyms) {
                        synonyms = v.synonyms.length > limit ? `${v.synonyms.splice(0, limit).join(' / ')} +${v.synonyms.length} more` : v.synonyms.join(' / ')
                      }

                      return (
                      <li key={'inner' + index} className='list-item list-item--underlined'>
                        <a href={v.slug} className='list-link'><h3 className='h4 grey'>{name}</h3>
                        {synonyms && <p className='grey'>Also called: {synonyms}</p>}
                        {realName}
                        {v.description && <p><span className='muted'>{v.description}</span></p>}
                        </a>
                      </li>)
                    })}
                    </ul>
                    <a className='quiet spacing-top--single' href='#app'>Return to top</a>
                  </li>
                )
              })}
            </ul>
          </GridCol>
        </Grid>
      </Main>
      <Footer />
      <GA />
    </React.Fragment>
  )
}
export default DrugList
