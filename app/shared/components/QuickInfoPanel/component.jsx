import React from 'react'

class QuickInfoPanel extends React.PureComponent {
  constructor(props) {
    super(props)
    console.log(props)
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
              <a className="quick-info-panel__link" href="./#">
                Feelings
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelFeelings}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelEffects && (
            <div className="quick-info-panel__wrapper col-12">
              <a className="quick-info-panel__link" href="./#">
                Effects
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelEffects}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelTimeToKickIn && (
            <div className="quick-info-panel__wrapper col-6">
              <a className="quick-info-panel__link" href="./#">
                Time to kick in
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelTimeToKickIn}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelDuration && (
            <div className="quick-info-panel__wrapper col-6">
              <a className="quick-info-panel__link" href="./#">
                Effects can last
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelDuration}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelAddictiveness && (
            <div className="quick-info-panel__wrapper  col-6">
              <a className="quick-info-panel__link" href="./#">
                Addictiveness
              </a>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelAddictiveness}
              </p>
            </div>
          )}
          {this.props.lawClass.fields.class &&
            this.props.lawClass.fields.class.toLowerCase() !== 'none' && (
              <div className="quick-info-panel__wrapper  col-6">
                <a className="quick-info-panel__link" href="./#">
                  Class
                </a>
                <p className="quick-info-panel__description">
                  {this.props.lawClass.fields.class}
                </p>
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default QuickInfoPanel
