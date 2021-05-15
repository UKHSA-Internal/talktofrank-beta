import React from 'react'
class QuickInfoPanel extends React.Component {
  render() {
    return (
      <div className="quick-info-panel">
        <div className="row">
          <div className="quick-info-panel__heading">
            <h5 className="quick-info-panel__heading_title">Quick info</h5>
          </div>
          <div className="quick-info-panel__wrapper col-12">
            <p className="quick-info-panel__warning">
              How the drug works varies from person to person
            </p>
          </div>
          {this.props.quickInfoPanelFeelings && (
            <div className="quick-info-panel__wrapper col-12 col-md-6">
              <p className="quick-info-panel_title">How you might feel</p>

              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelFeelings}{' '}
                <a
                  onClick={e => this.props.handleHowItFeelsClick(e)}
                  className="quick-info-panel__link"
                  href={this.props.slug ? `/drug/${this.props.slug}#how-it-feels` : '#how-it-feels'}
                >
                  Read more
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelEffects && (
            <div className="quick-info-panel__wrapper col-12 col-md-6">
              <p className="quick-info-panel_title">Effects on your body</p>

              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelEffects}{' '}
                <a
                  onClick={e => this.props.handleHowItFeelsClick(e)}
                  className="quick-info-panel__link"
                  href={this.props.slug ? `/drug/${this.props.slug}#how-it-feels` : '#how-it-feels'}
                >
                  Read more
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelTimeToKickIn && (
            <div className="quick-info-panel__wrapper col-12 col-md-6">
              <p className="quick-info-panel_title">
                How long it takes to work
              </p>

              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelTimeToKickIn}{' '}
                <a
                  onClick={e => this.props.handleDurationClick(e)}
                  className="quick-info-panel__link"
                  href={this.props.slug ? `/drug/${this.props.slug}#duration` : '#duration'}
                >
                  Read more
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelDuration && (
            <div className="quick-info-panel__wrapper col-12 col-md-6">
              <p className="quick-info-panel_title">
                How long the effects last
              </p>

              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelDuration}{' '}
                <a
                  onClick={e => this.props.handleDurationClick(e)}
                  className="quick-info-panel__link"
                  href={this.props.slug ? `/drug/${this.props.slug}#duration` : '#duration'}
                >
                  Read more
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelRisks && (
            <div className="quick-info-panel__wrapper col-12 col-md-6">
              <p className="quick-info-panel_title">Common risks</p>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelRisks}{' '}
                <a
                  onClick={e => this.props.handleTheRisksClick(e)}
                  className="quick-info-panel__link"
                  href={this.props.slug ? `/drug/${this.props.slug}#the-risks` : '#the-risks'}
                >
                  Read more
                </a>
              </p>
            </div>
          )}
          {this.props.quickInfoPanelMixing && (
            <div className="quick-info-panel__wrapper col-12 col-md-6">
              <p className="quick-info-panel_title">Reduce the risks</p>
              <p className="quick-info-panel__description">
                {this.props.quickInfoPanelMixing}{' '}
                <a
                  onClick={e => this.props.handleMixingClick(e)}
                  className="quick-info-panel__link"
                  href={this.props.slug ? `/drug/${this.props.slug}#mixing` : '#mixing'}
                >
                  Read more
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
