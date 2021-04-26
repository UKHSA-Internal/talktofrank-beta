import React from 'react'

const QuickInfoPanel = props => {
  return (
    <div className="quick-info-panel">
      <div className="row">
        <div className="quick-info-panel__heading">
          <h5 className="quick-info-panel__title">Quick info</h5>
        </div>
        {props.quickInfoPanelFeelings && (
          <div className="quick-info-panel__wrapper col-12">
            <a className="quick-info-panel__link" href="#how-it-feels">
              How you might feel
            </a>
            <p className="quick-info-panel__description">
              {props.quickInfoPanelFeelings}
            </p>
          </div>
        )}
        {props.quickInfoPanelEffects && (
          <div className="quick-info-panel__wrapper col-12">
            <a className="quick-info-panel__link" href="#how-it-feels">
              Effects on your body
            </a>
            <p className="quick-info-panel__description">
              {props.quickInfoPanelEffects}
            </p>
          </div>
        )}
        {props.quickInfoPanelTimeToKickIn && (
          <div className="quick-info-panel__wrapper col-6">
            <a className="quick-info-panel__link" href="#how-it-feels">
              Time to kick in
            </a>
            <p className="quick-info-panel__description">
              {props.quickInfoPanelTimeToKickIn}
            </p>
          </div>
        )}
        {props.quickInfoPanelDuration && (
          <div className="quick-info-panel__wrapper col-6">
            <a className="quick-info-panel__link" href="#duration">
              How long it lasts
            </a>
            <p className="quick-info-panel__description">
              {props.quickInfoPanelDuration}
            </p>
          </div>
        )}
        {props.quickInfoPanelMixing && (
          <div className="quick-info-panel__wrapper  col-6">
            <a className="quick-info-panel__link" href="#mixing">
              Mixing with other drugs
            </a>
            <p className="quick-info-panel__description">
              {props.quickInfoPanelMixing}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default QuickInfoPanel
