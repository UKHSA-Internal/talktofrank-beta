import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Footer from '../Footer/component.jsx'
import Hero from '../Hero/component.jsx'
import Accent from '../Accent/component.jsx'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component.jsx'
import AccessibleSearch from '../AccessibleSearch/component.jsx'
import ArrowLink from '../ArrowLink/component.jsx'
import FactsAboutDrugs from '../FactsAboutDrugs/component.jsx'
import BlockFrankAdvice from '../BlockFrankAdvice/component.jsx'
import BlockFeaturedVideo from '../BlockFeaturedVideo/component.jsx'
import HelpPanels from '../HelpPanels/component.jsx'

import MatomoAnalytics from '../MatomoAnalytics/component.jsx'

export default class PageHome extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <React.Fragment>
        <Masthead path={this.props.location}/>
        <Main>
          <Hero {...this.props.hero} />
          <Accent className="accent--muted" modifier="wrapper--constant">
            <SiteMessageContainer path={this.props.location} body={true}/>
            <AccessibleSearch id="autocomplete-home"/>
            <div className="constrain">
              <ArrowLink
                label="A-Z list of drugs"
                className="arrowlink--spacing-top arrowlink--spacing-mobile arrowlink--align-right-sm"
                href="/drugs-a-z"
                text="Or go to the drugs A-Z list"
              />
            </div>
          </Accent>
          <FactsAboutDrugs drugsGrid={this.props.drugsGrid} />
          {this.props.featuredVideoBlock && (
            <BlockFeaturedVideo {...this.props.featuredVideoBlock} />
          )}
          {this.props.frankAdviceBlock && (
            <BlockFrankAdvice {...this.props.frankAdviceBlock} />
          )}
          <HelpPanels/>
        </Main>
        <Footer/>
        <MatomoAnalytics/>
        <SiteMessageContainer path={this.props.location}/>
      </React.Fragment>
    )
  }
}
