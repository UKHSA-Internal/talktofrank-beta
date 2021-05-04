import React from 'react'
import { isInBrowser, scrollIntoView } from '../../utilities'
class QuickInfoPanel extends React.Component {
  handleClick(e, section) {
    // Handles toggling open the accordion and scrolling
    if (isInBrowser()) {
      e.preventDefault()
      let btn = document.querySelector(
        `${section} > div > div > div > h2 > button`
      )
      if (!btn.classList.contains('collapsible__trigger--active')) {
        btn.click()
      }
      console.log(
        'scrolling to:',
        document.querySelector(`#section-${section.replace('#', '')}`)
      )
      scrollIntoView(
        document.querySelector(`#section-${section.replace('#', '')}`)
      )
    }
  }
  render() {
    return (
      <div className="quick-info-panel">
        <div className="row">
          <div className="quick-info-panel__heading">
            <h5 className="quick-info-panel__heading_title">Quick info</h5>
          </div>
          <div className="quick-info-panel__wrapper col-12">
            <p className="quick-info-panel__warning">
              How you experience the drug varies from person to person
            </p>
          </div>
          {this.props.quickInfoPanelFeelings && (
            <div className="quick-info-panel__wrapper col-12">
              <p className="quick-info-panel_title">How you might feel</p>

              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelFeelings}{' '}
                <a
                  onClick={e => this.handleClick(e, '#how-it-feels')}
                  className="quick-info-panel__link"
                  href="#how-it-feels"
                >
                  (Read more)
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelEffects && (
            <div className="quick-info-panel__wrapper col-12">
              <p className="quick-info-panel_title">Effects on your body</p>

              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelEffects}{' '}
                <a
                  onClick={e => this.handleClick(e, '#how-it-feels')}
                  className="quick-info-panel__link"
                  href="#how-it-feels"
                >
                  (Read more)
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelTimeToKickIn &&
            this.props.quickInfoPanelDuration && (
              <div className="quick-info-panel__wrapper col-12">
                <p className="quick-info-panel_title">Duration</p>

                <p className="quick-info-panel__description">
                  <p>
                    Average time to kick in:{' '}
                    {this.props.quickInfoPanelTimeToKickIn}{' '}
                  </p>
                  <p>Average duration: {this.props.quickInfoPanelDuration} </p>
                  <a
                    onClick={e => this.handleClick(e, '#how-it-feels')}
                    className="quick-info-panel__link"
                    href="#how-it-feels"
                  >
                    (Read more)
                  </a>
                </p>
              </div>
            )}
          {this.props.quickInfoPanelRisks && (
            <div className="quick-info-panel__wrapper  col-12">
              <p className="quick-info-panel_title">Risks</p>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelRisks}{' '}
                <a
                  onClick={e => this.handleClick(e, '#the-risks')}
                  className="quick-info-panel__link"
                  href="#the-risks"
                >
                  (Read more)
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelMixing && (
            <div className="quick-info-panel__wrapper  col-12">
              <p className="quick-info-panel_title">Dangerous mixes</p>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelMixing}{' '}
                <a
                  onClick={e => this.handleClick(e, '#mixing')}
                  className="quick-info-panel__link"
                  href="#mixing"
                >
                  Mixing with other drugs
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default QuickInfoPanel
