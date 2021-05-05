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
import PickADrug from '../PickADrug/component.jsx'
import BlockFeaturedVideo from '../BlockFeaturedVideo/component.jsx'
import BlockDrugsAndyou from '../BlockDrugsAndYou/component.jsx'

export default class PageHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      windowSize: 1920
    }
  }

  onClickHandler = selected => {
    this.setState({ selected: selected })
  }
  selectedDrug = (type = 'full') => {
    const found = this.props.drugsGrid.find(
      drug => drug.slug === this.state.selected
    )
    if (type === 'name') {
      return found?.drugGridName || found?.drugName
    }
    if (type === 'drugName') {
      return found?.drugName || ' this drug.'
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
                className="arrowlink--spacing-top arrowlink--spacing-mobile arrowlink--align-right-sm"
                label="Or go to the drugs A-Z list"
                href="/drugs-a-z"
                text="Or go to the drugs A-Z list"
              />
            </div>
          </Accent>
          <Accent
            className="accent--shallow druggridwrapper"
            modifier="wrapper--constant"
          >
            <div className="druggridwrapper__header">
              <h3 className="text-center">Facts about...</h3>
              <p className="text-gradient text-center" ref={this.drugRef}>
                Select a drug for quick info
              </p>
            </div>
            <Grid>
              <GridCol className="col-12 col-lg-6">
                <DrugGrid
                  drugs={this.props.drugsGrid}
                  onClick={this.onClickHandler}
                  selected={this.state.selected}
                />
                <ArrowLink
                  href="/drugs-a-z"
                  text="View the full list of drugs"
                  className="arrowlink--align-center m-t-75"
                />
              </GridCol>
              <GridCol className="offset-lg-1 col-12 col-lg-5 hidden--md">
                {this.selectedDrug()?.image?.fields?.imageSmall?.fields?.file
                  ?.url && (
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
                      this.selectedDrug()?.image?.fields?.imageSmall?.fields
                        ?.file?.url
                    }
                  />
                )}
                {this.state.selected ? (
                  <React.Fragment>
                    <Heading
                      type="h3"
                      className="text-gradient drug-title"
                      text={this.selectedDrug('drugName')}
                    />
                    <QuickInfoPanelTabs {...this.selectedDrug()} />
                    <ArrowLink
                      href={`/drug/${this.selectedDrug()?.slug}`}
                      text={`Learn more about ${this.selectedDrug('drugName')}`}
                      className="arrowlink--align-left m-t-30"
                    />
                  </React.Fragment>
                ) : (
                  <PickADrug />
                )}
              </GridCol>
            </Grid>
          </Accent>
          {this.props.featuredVideoBlock && (
            <BlockFeaturedVideo {...this.props.featuredVideoBlock} />
          )}
          <BlockDrugsAndyou />
          {this.props.frankAdviceBlock && (
            <BlockFrankAdvice {...this.props.frankAdviceBlock} />
          )}
        </Main>
        <Footer />
        <GA />
        <SiteMessageContainer path={this.props.location} />
      </React.Fragment>
    )
  }
}
