import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Main from '../Main/component.jsx'
import Footer from '../Footer/component.jsx'
import { GA } from '../GoogleAnalytics/component.jsx'
import Hero from '../Hero/component.jsx'
import Heading from '../Heading/component.jsx'
import Accent from '../Accent/component.jsx'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component.jsx'
import AccessibleSearch from '../AccessibleSearch/component.jsx'
import ArrowLink from '../ArrowLink/component.jsx'
import DrugGrid from '../DrugGrid/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import QuickInfoPanelTabs from '../QuickInfoPanelTabs/component.jsx'
import BlockFrankAdvice from '../BlockFrankAdvice/component.jsx'
import InfoPanel from '../InfoPanel/component.jsx'
export default class PageHome extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'cocaine'
    }
  }
  onClickHandler = selected => {
    console.log('selected', selected)
    this.setState({ selected: selected })
  }
  selectedDrug = (type = 'full') => {
    const found = this.props.drugsGrid.find(
      drug => drug.slug === this.state.selected
    )
    if (type === 'name') {
      return found.drugGridName || found.drugName
    }
    return found
  }

  render() {
    return (
      <React.Fragment>
        <Masthead path={this.props.location} />
        <Main>
          <Hero {...this.props.hero} />
          <Accent className="accent--muted" modifier="wrapper--constant">
            <SiteMessageContainer path={this.props.location} body={true} />
            <AccessibleSearch />
            <div className="constrain">
              <ArrowLink
                className="arrowlink--spacing-top"
                label="Or go to the drugs A-Z list"
                href="/drugs-a-z"
                text="Or go to the drugs A-Z list"
              />
            </div>
          </Accent>
          <Accent className="accent--shallow druggridwrapper">
            <Heading type="h3" className="text-center" text="Facts about..." />
            <Grid>
              <GridCol className="col-12 col-md-6">
                <DrugGrid
                  drugs={this.props.drugsGrid}
                  onClick={this.onClickHandler}
                  selected={this.state.selected}
                />
              </GridCol>
              <GridCol className="offset-md-1 col-12 col-md-5 ">
                <img
                  className="image"
                  style={{
                    maxWidth: '186px'
                  }}
                  alt={
                    this.selectedDrug()?.image?.fields?.imageSmall?.fields
                      ?.description || `Image of ${this.selectedDrug('name')}`
                  }
                  src={
                    this.selectedDrug()?.image?.fields?.imageSmall?.fields?.file
                      ?.url || 'https://via.placeholder.com/186x150'
                  }
                />
                <Heading
                  type="h3"
                  className="text-gradient drug-title"
                  text={this.selectedDrug('name')}
                />
                <QuickInfoPanelTabs {...this.selectedDrug()} />
              </GridCol>
            </Grid>
          </Accent>

          {this.props.frankAdviceBlock && (
            <BlockFrankAdvice {...this.props.frankAdviceBlock} />
          )}
          <Accent className="accent--spacing-only-top">
            <Grid>
              <GridCol className="col-12 col-md-5">
                <InfoPanel
                  className="info-panel--footerleft"
                  title="Concerned about..."
                >
                  <ArrowLink
                    className="arrowlink--spacing-bottom"
                    href="#/"
                    text="A friend"
                  />
                  <ArrowLink
                    className="arrowlink--spacing-bottom"
                    href="#/"
                    text="A child"
                  />
                  <ArrowLink
                    className="arrowlink--spacing-bottom"
                    href="#/"
                    text="Pressure to take drugs"
                  />
                </InfoPanel>
              </GridCol>
              <GridCol className="col-12 col-md-7">
                <InfoPanel
                  className="info-panel--pink info-panel--footerright"
                  title="What to do in an emergency"
                  icon="warning-white"
                >
                  <p>
                    If you think someone needs urgent help after taking drugs,
                    call 999 for an ambulance. Tell the crew everything you
                    know. It could save their life.
                  </p>
                  <ArrowLink href="#/" text="What else to do in an emergency" />
                </InfoPanel>
              </GridCol>
            </Grid>
          </Accent>
        </Main>
        <Footer />
        <GA />
        <SiteMessageContainer path={this.props.location} />
      </React.Fragment>
    )
  }
}
