import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Nav from '../Nav/component.jsx'
import Divider from '../Divider/component.jsx'
import Longform from '../Longform/component.jsx'
import AccessibleSearch from '../AccessibleSearch/component.jsx'
import Accent from '../Accent/component.jsx'
import LinkDrugName from '../LinkDrugName/component.jsx'
import { GA } from '../GoogleAnalytics/component.jsx'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component'
import HelpPanels from '../HelpPanels/component.jsx'

const DrugList = props => {
  const limit = 4
  // @refactor @joel - drag this out into the container to map it nicely
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
      <Masthead path={props.location} />
      <Main>
        <Accent
          className="accent--muted accent--az"
          modifier="wrapper--constant"
        >
          <AccessibleSearch />
        </Accent>
        <Accent className="accent--shallow" modifier="wrapper--tight">
          <Heading
            type="h1"
            className="h2 inverted spacing-left az-page-title"
            text="Drugs A to Z"
          />
          <Longform className="az-intro" text={props.introText} />
          <Nav
            navigation={initialLetter}
            className="navbar-expand navbar-list"
            labelledBy="drugs-a-z-navigation"
            visible="true"
            type="nav"
          />
        </Accent>
        <Divider className="hr--muted" />
        <Accent className="accent--shallow">
          <Grid>
            <GridCol className="col-12 col-sm-8 offset-sm-2">
              <ul className="list-unstyled" role="list">
                {props.list.map((val, i) => {
                  return (
                    <li id={val.group} key={'outer' + i}>
                      <Heading
                        text={val.group}
                        className={
                          'display-4 heading--primary' +
                          (i === 0 ? '' : ' spacing-top--large')
                        }
                      />
                      <ul className="list-unstyled">
                        {val.values.map((v, index) => {
                          // @refactor - please tidy this up : )
                          let synonyms
                          let realName = v.parent ? v.parent : null

                          if (v.synonyms) {
                            synonyms =
                              v.synonyms.length > limit
                                ? `${v.synonyms
                                    .slice(0, limit)
                                    .join(' / ')} +${v.synonyms.length -
                                    v.synonyms.slice(0, limit).length} more`
                                : v.synonyms.join(' / ')
                          }

                          return (
                            <LinkDrugName
                              key={index}
                              {...v}
                              synonyms={synonyms || null}
                              realName={realName || null}
                            />
                          )
                        })}
                      </ul>
                      <small>
                        <a className="return-to-top" href="#main">
                          Return to top <span aria-hidden="true">^</span>
                        </a>
                      </small>
                    </li>
                  )
                })}
              </ul>
            </GridCol>
          </Grid>
        </Accent>
        <HelpPanels />
      </Main>
      <Footer />
      <GA />
      <SiteMessageContainer path={props.location} />
    </React.Fragment>
  )
}
export default DrugList
