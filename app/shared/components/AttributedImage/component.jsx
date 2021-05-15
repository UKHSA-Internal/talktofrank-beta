import React from 'react'
import Icon from '../Icon/component.jsx'
class AttributedImage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      icons: {
        visible: {
          label: 'Learn more about this artwork',
          url: '/ui/svg/eye-visible.svg'
        },
        hidden: {
          label: 'Learn more about this artwork',
          url: '/ui/svg/eye-hidden.svg'
        }
      },
      ref: React.createRef()
    }
  }
  handleClick = id => {
    this.setState({ visible: !this.state.visible })
  }
  render() {
    return (
      <div
        role="img"
        aria-label={
          this.props.drug.image?.fields?.imageSmall?.fields?.description
        }
        className="attributedimage"
        style={{
          background: `url(${this.props.drug.image?.fields?.imageSmall?.fields?.file?.url}) no-repeat center/cover`
        }}
      >
        {this.props.drug.image?.fields?.imageSmall.fields.description && (
          <div>
            <button
              aria-label="View image attribution details"
              className="attributedimage__view-attribution"
              onClick={this.handleClick}
            >
              {!this.state.visible ? (
                <Icon {...this.state.icons.visible} />
              ) : (
                <Icon {...this.state.icons.hidden} />
              )}
              View attribution
            </button>
            <div
              aria-expanded={this.state.visible}
              className={
                'attributedimage__attribution-wrapper ' +
                (!this.state.visible
                  ? 'attributedimage__attribution-wrapper--hidden'
                  : '')
              }
            >
              <p>
                {this.props.drug.image?.fields?.imageSmall.fields.description}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default AttributedImage
