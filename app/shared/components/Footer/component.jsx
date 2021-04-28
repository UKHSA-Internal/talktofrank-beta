import React from 'react'
import Nav from '../Nav/component.jsx'
import Divider from '../Divider/component.jsx'
import {
  footer,
  footerUtility,
  footerButton
} from '../../fixtures/navigation.js'
import Accent from '../Accent/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import InfoPanel from '../InfoPanel/component.jsx'
import ArrowLink from '../ArrowLink/component.jsx'
const Footer = props => {
  return (
    <React.Fragment>
      <Accent className="accent--spacing-only-top wrapper--constant">
        <Grid>
          <GridCol className="col-12 col-md-5">
            <InfoPanel
              className="info-panel--footerleft"
              title="Concerned about..."
            >
              <ArrowLink
                className="arrowlink--spacing-bottom"
                href="/get-help/worried-about-a-friend"
                text="A friend"
              />
              <ArrowLink
                className="arrowlink--spacing-bottom"
                href="/get-help/worried-about-a-child"
                text="A child"
              />
              <ArrowLink
                className="arrowlink--spacing-bottom"
                href="/get-help/dealing-with-peer-pressure"
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
                If you or someone else needs urgent help after taking drugs,
                call 999 for an ambulance. Tell the crew everything you know, it
                could save a life.
              </p>
              <ArrowLink
                href="/get-help/what-to-do-in-an-emergency"
                text="What else to do in an emergency"
              />
            </InfoPanel>
          </GridCol>
        </Grid>
      </Accent>
      <footer className="footer">
        <section className="footer__inner">
          <Nav
            role={null}
            className="displaced-top"
            navigation={footerButton}
            visible="true"
          />
          <Nav
            role={null}
            className="navbar-expand navbar-raised"
            navigation={footer}
            visible="true"
          />
          <Divider className="hr--inverse" />
          <Nav
            role={null}
            className="navbar-expand navbar-muted"
            navigation={footerUtility}
            visible="true"
          />
        </section>
        {props.children}
      </footer>
    </React.Fragment>
  )
}

export default Footer
