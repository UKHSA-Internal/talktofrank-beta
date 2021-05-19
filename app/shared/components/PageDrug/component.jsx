import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Heading from '../Heading/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Accent from '../Accent/component.jsx'
import Picture from '../Picture/component.jsx'
import { GA } from '../GoogleAnalytics/component.jsx'
import { imageMap, fieldIncludesImages, isInBrowser } from '../../utilities'
import SiteMessageContainer from '../../containers/SiteMessageContainer/component'
import QuickInfoPanel from '../QuickInfoPanel/component.jsx'
import DrugWarningPanel from '../DrugWarningPanel/component.jsx'

import Carousel from '../Carousel/Carousel.jsx'
import HelpPanels from '../HelpPanels/component.jsx'

export default class Page extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  handleReadMeClick(e, section) {
    if (isInBrowser()) {
      e.preventDefault()
      window.history.replaceState(
        {},
        '',
        `${window.location.href.split('#')[0]}#${section}`
      )

      this.setState({ selected: section })
    }
  }

  hasQuickInfo = () => {
    const fields = Object.keys(this.props.fields)
    const count = fields.filter(field => field.includes('quickInfoPanel'))
    if (count?.length >= 4) {
      return true
    }
    return false
  }

  render() {
    const modifiers = {
      type: 'h3',
      className: 'h5'
    }

    const name = this.props.fields.drugActualName || this.props.fields.drugName
    const syn = this.props.location.search
      ? decodeURIComponent(this.props.location.search.split('=')[1])
      : null
    let hasImage =
      this.props.fields.image && fieldIncludesImages(this.props.fields.image)

    return (
      <React.Fragment>
        <Masthead path={this.props.location} />
        <Main>
          {this.props.fields.schemaDefinitions && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(this.props.fields.schemaDefinitions)
              }}
            />
          )}
          {this.props.fields.sliderImages && (
            <Carousel images={this.props.fields.sliderImages} />
          )}
          <Accent modifier="wrapper--constant">
            <Grid>
              {hasImage && (
                <GridCol className="col-12 col-md-3">
                  <Picture
                    className={
                      'drug-image ' +
                      (this.props.fields.sliderImages ? 'has-carousel' : '')
                    }
                    {...imageMap(this.props.fields)}
                  />
                </GridCol>
              )}
              <GridCol
                className={
                  'col-12 col-md-7 ' + (!hasImage ? 'offset-md-3' : '')
                }
              >
                <Heading
                  type="h1"
                  text={this.props.fields.drugName}
                  className={`h2 inverted ${hasImage ? 'has-image' : ''}`}
                />

                <Longform
                  className="long-form--no-p-spacing"
                  text={this.props.fields.description}
                />
                {this.props.fields.synonyms &&
                  this.props.fields.synonyms[0] !== '' && (
                    <React.Fragment>
                      <p className="lead bold">Also called:</p>
                      <ul className="list-unstyled spacing-bottom--tight">
                        {this.props?.fields?.synonyms
                          .slice(0)
                          .sort()
                          .map((item, i) => (
                            <li
                              className={
                                'list-inline-item inverted bold' +
                                (syn !== item ? ' inverted--quiet' : '')
                              }
                              key={i}
                            >
                              {item}
                            </li>
                          ))}
                      </ul>
                    </React.Fragment>
                  )}
              </GridCol>
            </Grid>
            <Grid className="spacing-top--single">
              <GridCol className="col-12 col-md-7 offset-md-3 ">
                {this.props.fields.warning && (
                  <DrugWarningPanel text={this.props.fields.warning} />
                )}
                {this.hasQuickInfo() && <QuickInfoPanel
                  heading="h2"
                  handleHowItFeelsClick={(e) => this.handleReadMeClick(e, 'how-it-feels')}
                  handleDurationClick={(e) => this.handleReadMeClick(e, 'duration')}
                  handleTheRisksClick={(e) => this.handleReadMeClick(e, 'the-risks')}
                  handleMixingClick={(e) => this.handleReadMeClick(e, 'mixing')}
                  {...this.props.fields}
                />}
              </GridCol>
            </Grid>
          </Accent>
          {(this.props.fields.qualitiesAppearance ||
            this.props.fields.qualitiesTaste) && (
            <section className="section section--has-toggle">
              <Toggle
                text="How it looks, tastes and smells"
                className="collapsible--chevron collapsible--first"
                history={this.props.location}
              >
                {this.props.fields.qualitiesAppearance && (
                  <React.Fragment>
                    <Heading {...modifiers} text="What does it look like?" />
                    <Longform text={this.props.fields.qualitiesAppearance} />
                  </React.Fragment>
                )}
                {this.props.fields.qualitiesTaste && (
                  <React.Fragment>
                    <Heading
                      {...modifiers}
                      text="What does it taste/smell like?"
                    />
                    <Longform text={this.props.fields.qualitiesTaste} />
                  </React.Fragment>
                )}
              </Toggle>
            </section>
          )}
          {this.props.fields.qualitiesAdministered && (
            <section className="section section--has-toggle">
              <Toggle
                text="How do people take it?"
                className="collapsible--chevron"
                history={this.props.location}
              >
                <Longform text={this.props.fields.qualitiesAdministered} />
              </Toggle>
            </section>
          )}
          {(this.props.fields.category ||
            this.props.fields.effectsFeeling ||
            this.props.fields.effectsBehaviour) && (
            <section className="section section--has-toggle">
              <Toggle
                text="How it feels"
                className="collapsible--chevron"
                history={this.props.location}
                open={this.state.selected === 'how-it-feels'}
              >
                {this.props.fields.category &&
                  this.props.fields.category.toLowerCase() !== 'none' && (
                    <Heading
                      type="p"
                      className="h3 inverted"
                      text={this.props.fields.category}
                    />
                  )}
                {this.props.fields.effectsFeeling && (
                  <React.Fragment>
                    <Heading {...modifiers} text="How does it make you feel?" />
                    <Longform text={this.props.fields.effectsFeeling} />
                  </React.Fragment>
                )}
                {this.props.fields.effectsBehaviour && (
                  <React.Fragment>
                    <Heading
                      {...modifiers}
                      text={`How does it make people behave?`}
                    />
                    <Longform text={this.props.fields.effectsBehaviour} />
                  </React.Fragment>
                )}
              </Toggle>
            </section>
          )}
          {this.props.fields.durationDefault && (
            <section className="section section--has-toggle">
              <Toggle
                text="Duration"
                className="collapsible--chevron"
                history={this.props.location}
                open={this.state.selected === 'duration'}
              >
                {this.props.fields.durationDefault && (
                  <Longform
                    text={this.props.fields.durationDefault.fields.text}
                  />
                )}
                {this.props.fields.durationDetail && (
                  <Longform text={this.props.fields.durationDetail} />
                )}
                {this.props.fields.durationDetectable && (
                  <React.Fragment>
                    <Heading
                      {...modifiers}
                      text="How long will it be detectable?"
                    />
                    <Longform text={this.props.fields.durationDetectable} />
                    {this.props.fields.durationDetectableDefault && (
                      <Longform
                        text={
                          this.props.fields.durationDetectableDefault.fields
                            .text
                        }
                      />
                    )}
                  </React.Fragment>
                )}
              </Toggle>
            </section>
          )}
          {(this.props.fields.risksHealthMental ||
            this.props.fields.risksPhysicalHealth ||
            this.props.fields.risksCutWith) && (
            <section className="section section--has-toggle">
              <Toggle
                text="The risks"
                className="collapsible--chevron"
                history={this.props.location}
                open={this.state.selected === 'the-risks'}
              >
                {this.props.fields.risksPhysicalHealth && (
                  <React.Fragment>
                    <Heading {...modifiers} text={`Physical health risks`} />
                    <Longform
                      className="has-unordered"
                      text={this.props.fields.risksPhysicalHealth}
                    />
                  </React.Fragment>
                )}
                {this.props.fields.risksHealthMental && (
                  <React.Fragment>
                    <Heading {...modifiers} text={`Mental health risks`} />
                    <Longform
                      className="has-unordered"
                      text={this.props.fields.risksHealthMental}
                    />
                  </React.Fragment>
                )}
                {this.props.fields.risksCutWith && (
                  <React.Fragment>
                    <Heading
                      {...modifiers}
                      text={`What is ${name} cut with?`}
                    />
                    <Longform
                      className="has-unordered"
                      text={this.props.fields.risksCutWith}
                    />
                  </React.Fragment>
                )}
              </Toggle>
            </section>
          )}
          {this.props.fields.mixingDangers && (
            <section className="section section--has-toggle">
              <Toggle
                text="Mixing"
                className="collapsible--chevron"
                history={this.props.location}
                open={this.state.selected === 'mixing'}
              >
                <React.Fragment>
                  <Heading
                    {...modifiers}
                    text={`Is it dangerous to mix with other drugs?`}
                  />
                  <Longform text={this.props.fields.mixingDangers} />
                </React.Fragment>
              </Toggle>
            </section>
          )}
          {this.props.fields.addiction && (
            <section className="section section--has-toggle">
              <Toggle
                text="Addiction"
                className="collapsible--chevron"
                history={this.props.location}
              >
                {this.props.fields.addiction && (
                  <React.Fragment>
                    <Heading {...modifiers} text={`Can you get addicted?`} />
                    <Longform text={this.props.fields.addiction} />
                  </React.Fragment>
                )}
              </Toggle>
            </section>
          )}
          {this.props.fields.lawClass && (
            <section className="section section--has-toggle">
              <Toggle
                text="The law"
                className="collapsible--chevron"
                history={this.props.location}
              >
                <React.Fragment>
                  {this.props.fields.lawClass.fields.class &&
                    this.props.fields.lawClass.fields.class.toLowerCase() !==
                      'none' && (
                      <Heading
                        type="p"
                        className="h3 inverted spacing-bottom--single"
                        text={this.props.fields.lawClass.fields.class}
                      />
                    )}
                  <div className="long-form has-unordered">
                    <ul>
                      <Heading
                        type="li"
                        text={this.props.fields.lawClass.fields.description}
                      />
                      <Heading
                        type="li"
                        text={this.props.fields.lawClass.fields.possesion}
                      />
                      <Heading
                        type="li"
                        text={this.props.fields.lawClass.fields.supplying}
                      />
                    </ul>
                  </div>
                  <Longform text={this.props.fields.lawClass.fields.driving} />
                  <Longform
                    text={this.props.fields.lawClass.fields.dealersSupplying}
                  />
                </React.Fragment>
                {this.props.fields.lawDetail && (
                  <React.Fragment>
                    <Heading {...modifiers} text="Additional law details" />
                    <Longform text={this.props.fields.lawDetail} />
                  </React.Fragment>
                )}
                {this.props.fields.lawCaught && (
                  <React.Fragment>
                    <Heading {...modifiers} text="What if you are caught?" />
                    <Longform text={this.props.fields.lawCaught.fields.text} />
                  </React.Fragment>
                )}
              </Toggle>
            </section>
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
