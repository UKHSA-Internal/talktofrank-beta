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
import QuickInfoPanel from '../QuickInfoPanel/component.jsx'
import BlockFrankAdvice from '../BlockFrankAdvice/component.jsx'
import PickADrug from '../PickADrug/component.jsx'
import BlockFeaturedVideo from '../BlockFeaturedVideo/component.jsx'

export default class PageHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
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
                aria='aria-labeledby="A-Z list of drugs"'
                className="arrowlink--spacing-top arrowlink--spacing-mobile arrowlink--align-right-sm"
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
              <h2 className="text-center">Facts about drugs</h2>
              <p className="text-gradient text-center">
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
              <GridCol className=" col-12 col-lg-6 hidden--md">
                {this.state.selected ? (
                  this.props.drugsGrid.map(drug => (
                    <div
                      id={`drugsgrid__panel-${drug.slug}`}
                      aria-labelledby={`druggrid__button-${drug.slug}`}
                      role="region"
                      className={
                        drug.slug !== this.state.selected
                          ? 'visually-hidden'
                          : ''
                      }
                    >
                      <div className="flex justify-content-between align-items-start">
                        <div className="m-b-60">
                          <Heading
                            type="h3"
                            className="text-gradient drug-title"
                            text={drug.drugGridName || drug.drugName}
                          />
                          <p className="m-0">{drug.description}</p>
                          <ArrowLink
                            href={`/drug/${drug.slug}`}
                            text="Learn more"
                            className="arrowlink--align-left m-t-10"
                          />
                        </div>
                        {drug.image?.fields?.imageSmall?.fields?.file?.url && (
                          <img
                            className="image m-l-20"
                            style={{
                              maxWidth: '186px'
                            }}
                            alt={
                              drug.image?.fields?.imageSmall?.fields
                                ?.description || `Image of ${drug.name}`
                            }
                            src={
                              drug.image?.fields?.imageSmall?.fields?.file?.url
                            }
                          />
                        )}
                      </div>
                      <QuickInfoPanel {...drug} />
                    </div>
                  ))
                ) : (
                  <PickADrug />
                )}
              </GridCol>
            </Grid>
          </Accent>
          {this.props.featuredVideoBlock && (
            <BlockFeaturedVideo {...this.props.featuredVideoBlock} />
          )}
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
