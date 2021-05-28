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
import AttributedImage from '../AttributedImage/component.jsx'
import { isInBrowser, scrollIntoViewFromCurrent } from '../../utilities'
import HelpPanels from '../HelpPanels/component.jsx'

export default class PageHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      isDrugGridTraversable: true
    }
    props.drugsGrid.map(drug => {
      this[`drugsgrid__panel-${drug.slug}`] = React.createRef()
    })
  }

  onClickHandler = selected => {
    if (isInBrowser() && window.innerWidth <= 991) {
      window.location = '/drug/' + selected
      return
    }

    this.setState({
      selected: selected,
      isDrugGridTraversable: false
    })
  }

  onFocusHandler = () => {
    this.setState({
      isDrugGridTraversable: true
    })
  }

  hasQuickInfo = drug => {
    const fields = Object.keys(drug)
    const count = fields.filter(field => field.includes('quickInfoPanel'))
    if (count?.length >= 4) {
      return true
    }
    return false
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      if (
        this[`drugsgrid__panel-${this.state.selected}`]
        && this[`drugsgrid__panel-${this.state.selected}`].current
      ) {
        scrollIntoViewFromCurrent(this[`drugsgrid__panel-${this.state.selected}`].current)
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Masthead path={this.props.location} />
        <Main>
          <Hero {...this.props.hero} />
          <Accent className="accent--muted" modifier="wrapper--constant">
            <SiteMessageContainer path={this.props.location} body={true} />
            <AccessibleSearch id="autocomplete-home" />
            <div className="constrain">
              <ArrowLink
                label="A-Z list of drugs"
                className="arrowlink--spacing-top arrowlink--spacing-mobile arrowlink--align-right-sm"
                href="/drugs-a-z"
                text="Or go to the drugs A-Z list"
              />
            </div>
          </Accent>
          {this.props.drugsGrid && (
            <Accent
              className="accent--shallow druggridwrapper"
              modifier="wrapper--constant"
            >
              <div className="druggridwrapper__header">
                <h2 className="text-center">Facts about drugs&hellip;</h2>
                <p className="text-gradient text-center visually-hidden">
                  Below are some of our most commonly searched drugs. Select any
                  of these drugs to find out further information.
                </p>
              </div>
              <Grid>
                <GridCol className="col-12 col-lg-6">
                  <DrugGrid
                    drugs={this.props.drugsGrid}
                    onClick={this.onClickHandler}
                    onBlur={this.onBlurHandler}
                    selected={this.state.selected}
                    isDrugGridTraversable={this.state.isDrugGridTraversable}
                  />
                </GridCol>
                <GridCol className="col-12 col-lg-6 druggridwrapper__quickinfocol">
                  {this.state.selected ? (
                    this.props.drugsGrid.map(drug => (
                      <div
                        key={drug.slug}
                        id={`drugsgrid__panel-${drug.slug}`}
                        aria-labelledby={`druggrid__button-${drug.slug}`}
                        role="region"
                        hidden={drug.slug !== this.state.selected}
                        ref={this[`drugsgrid__panel-${drug.slug}`]}
                      >
                        <div className="flex justify-content-between align-items-start">
                          <div className="m-b-60">
                            <Heading
                              type="span"
                              className="text-gradient drug-title"
                              text={drug.drugGridName || drug.drugName}
                              hidden="true"
                            />
                            <p className="drug-description">
                              {drug.description}
                            </p>
                            <ArrowLink
                              href={`/drug/${drug.slug}`}
                              text="Learn more"
                              className="arrowlink--align-left m-t-10"
                              label={`learn more about ${drug.drugGridName ||
                                drug.drugName}`}
                              onFocus={this.onFocusHandler}
                            />
                          </div>
                          {drug.image?.fields?.imageSmall?.fields?.file
                            ?.url && (
                            <AttributedImage
                              {...drug}
                              className="attributedimage__quickinfo"
                            />
                          )}
                        </div>
                        {this.state.selected && (
                          <QuickInfoPanel
                            className={
                              this.hasQuickInfo(drug)
                                ? ''
                                : ' quick-info-panel--hidden'
                            }
                            heading="h3"
                            open={this.state.selected}
                            {...drug}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <PickADrug />
                  )}
                </GridCol>
              </Grid>
            </Accent>
          )}
          {this.props.featuredVideoBlock && (
            <BlockFeaturedVideo {...this.props.featuredVideoBlock} />
          )}
          {this.props.frankAdviceBlock && (
            <BlockFrankAdvice {...this.props.frankAdviceBlock} />
          )}
          <HelpPanels />
        </Main>
        <Footer />
        <GA />
        <SiteMessageContainer path={this.props.location} />
      </React.Fragment>
    )
  }
}
