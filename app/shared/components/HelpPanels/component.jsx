import React from 'react'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import InfoPanel from '../InfoPanel/component.jsx'
import ArrowLink from '../ArrowLink/component.jsx'
const HelpPanels = () => {
  return (
    <div className="helppanels">
      <div className="wrapper wrapper--constant">
        <Grid>
          <GridCol className="col-12 col-md-5">
            <InfoPanel
              className="info-panel--footerleft"
              title="Concerned about..."
              screenReaderTitle="Help and advice"
            >
              <ArrowLink
                label="Concerned about a friend"
                className="arrowlink--spacing-bottom"
                href="/get-help/concerned-about-a-friend"
                text="A friend"
              />
              <ArrowLink
                label="Concerned about a child"
                className="arrowlink--spacing-bottom"
                href="/get-help/concerned-about-a-child"
                text="A child"
              />
              <ArrowLink
                label="Feeling pressured to take drugs?"
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
                If you or someone else needs urgent help after taking drugs or
                drinking, call 999 for an ambulance. Tell the crew everything
                you know. It could save their life.
              </p>
              <ArrowLink
                href="/get-help/what-to-do-in-an-emergency"
                text="What else to do in an emergency"
              />
            </InfoPanel>
          </GridCol>
        </Grid>
      </div>
    </div>
  )
}
export default HelpPanels
