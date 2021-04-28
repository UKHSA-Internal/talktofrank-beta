import React from 'react'
import { isInBrowser } from '../../utilities'
class QuickInfoPanel extends React.Component {
  handleClick(e, section) {
    if (isInBrowser()) {
      let btn = document.querySelector(
        `${section} > div > div > div > h2 > button`
      )
      if (!btn.classList.contains('collapsible__trigger--active')) {
        btn.click()
      }
    }
  }
  render() {
    return (
      <div className="quick-info-panel">
        <div className="row">
          <div className="quick-info-panel__heading">
            <h5 className="quick-info-panel__title">Quick info</h5>
          </div>
          {this.props.quickInfoPanelFeelings && (
            <div className="quick-info-panel__wrapper col-12">
              <a
                onClick={e => this.handleClick(e, '#how-it-feels')}
                className="quick-info-panel__link"
                href="#how-it-feels"
              >
                How you might feel
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelFeelings}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelEffects && (
            <div className="quick-info-panel__wrapper col-12">
              <a
                onClick={e => this.handleClick(e, '#how-it-feels')}
                className="quick-info-panel__link"
                href="#how-it-feels"
              >
                Effects on your body
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelEffects}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelTimeToKickIn && (
            <div className="quick-info-panel__wrapper col-6">
              <a
                onClick={e => this.handleClick(e, '#how-it-feels')}
                className="quick-info-panel__link"
                href="#how-it-feels"
              >
                Time to kick in
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelTimeToKickIn}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelDuration && (
            <div className="quick-info-panel__wrapper col-6">
              <a
                onClick={e => this.handleClick(e, '#duration')}
                className="quick-info-panel__link"
                href="#duration"
              >
                How long it lasts
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelDuration}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelMixing && (
            <div className="quick-info-panel__wrapper  col-12">
              <a
                onClick={e => this.handleClick(e, '#mixing')}
                className="quick-info-panel__link"
                href="#mixing"
              >
                Mixing with other drugs
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelMixing}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default QuickInfoPanel
