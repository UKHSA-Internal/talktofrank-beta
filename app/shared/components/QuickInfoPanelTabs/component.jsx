import React from 'react'
import ArrowLink from '../ArrowLink/component'

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
  render() {
    return (
      <div className="quick-info-panel-tabs">
        <div className="quick-info-panel-tabs__heading">
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
              <p className="quick-info-panel-tabs__title">Feelings</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelFeelings}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelEffects && (
            <div className="quick-info-panel-tabs__wrapper col-12">
              <p className="quick-info-panel-tabs__title">Effects</p>
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
              <p className="quick-info-panel-tabs__title">Effects can last</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelDuration}
              </p>
            </div>
          )}
          {this.props.quickInfoPanelAddictiveness && (
            <div className="quick-info-panel-tabs__wrapper  col-6">
              <p className="quick-info-panel-tabs__title">Addictiveness</p>
              <p className="quick-info-panel-tabs__description">
                {this.props.quickInfoPanelAddictiveness}
              </p>
            </div>
          )}
          {this.props.lawClass.fields.class &&
            this.props.lawClass.fields.class.toLowerCase() !== 'none' && (
              <div className="quick-info-panel-tabs__wrapper  col-6">
                <p className="quick-info-panel-tabs__title">Class</p>
                <p className="quick-info-panel-tabs__description">
                  {this.props.lawClass.fields.class}
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
        <ArrowLink
          href="#"
          text="Learn more about XXX"
          className="arrowlink--align-right"
        />
      </div>
    )
  }
}

export default QuickInfoPanelTabs
