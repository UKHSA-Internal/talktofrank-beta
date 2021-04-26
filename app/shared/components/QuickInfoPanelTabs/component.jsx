import React from 'react'

class QuickInfoPanelTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'quick-info'
    }
  }
  onClickHandler = type => {
    this.setState({ selected: type })
  }
  hasQuickInfo = () => {
    if (
      !this.props.quickInfoPanelFeelings &&
      !this.props.quickInfoPanelEffects &&
      !this.props.quickInfoPanelTimeToKickIn &&
      !this.props.quickInfoPanelDuration &&
      !this.props.quickInfoPanelMixing
    ) {
      return false
    }

    return true
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.drugName !== this.props.drugName) {
      if (this.hasQuickInfo()) {
        this.setState({ selected: 'quick-info' })
      } else {
        this.setState({ selected: 'other-names' })
      }
    }
  }
  componentDidMount() {
    if (!this.hasQuickInfo()) {
      this.setState({ selected: 'other-names' })
    }
  }

  render() {
    return (
      <div className="quick-info-panel-tabs">
        <div className="quick-info-panel-tabs__heading">
          {this.hasQuickInfo() && (
            <button
              onClick={() => this.onClickHandler('quick-info')}
              className={
                'quick-info-panel-tabs__tab' +
                (this.state.selected === 'quick-info'
                  ? ' quick-info-panel-tabs__tab--selected'
                  : '')
              }
            >
              Quick info
            </button>
          )}
          <button
            onClick={() => this.onClickHandler('other-names')}
            className={
              'quick-info-panel-tabs__tab' +
              (this.state.selected === 'other-names'
                ? ' quick-info-panel-tabs__tab--selected'
                : '')
            }
          >
            Other names
          </button>
        </div>
        <div
          className={
            'row' + (this.state.selected === 'quick-info' ? ' visible' : '')
          }
        >
          {this.props.quickInfoPanelFeelings && (
            <div className="quick-info-panel-tabs__wrapper col-12">
              <p className="quick-info-panel-tabs__title">How you might feel</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelFeelings}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelEffects && (
            <div className="quick-info-panel-tabs__wrapper col-12">
              <p className="quick-info-panel-tabs__title">
                Effects on your body
              </p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelEffects}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelTimeToKickIn && (
            <div className="quick-info-panel-tabs__wrapper col-6">
              <p className="quick-info-panel-tabs__title">Time to kick in</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelTimeToKickIn}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelDuration && (
            <div className="quick-info-panel-tabs__wrapper col-6">
              <p className="quick-info-panel-tabs__title">How long it lasts</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelDuration}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelMixing && (
            <div className="quick-info-panel-tabs__wrapper  col-6">
              <p className="quick-info-panel-tabs__title">
                Mixing with other drugs
              </p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelMixing}
              </p>
            </div>
          )}
        </div>

        <div
          className={
            'row' + (this.state.selected === 'other-names' ? ' visible' : '')
          }
        >
          {this.props.description && (
            <div className="quick-info-panel-tabs__wrapper col-12">
              <p className="quick-info-panel-tabs__title">Description</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.description}
              </p>
            </div>
          )}
          {this.props.synonyms && (
            <div className="quick-info-panel-tabs__wrapper col-12">
              <p className="quick-info-panel-tabs__title quick-info-panel-tabs__title--dark">
                Also called:
              </p>
              <ul className="list-unstyled">
                {this.props?.synonyms
                  ?.slice(0)
                  .sort()
                  .map((syn, i) => (
                    <li className={'list-inline-item bg-grey'} key={i}>
                      {syn}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default QuickInfoPanelTabs
