import React from 'react'
import PropTypes from 'prop-types'

class BlockFeaturedVideo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      url: this.props.embedUrl ? this.props.embedUrl + '?rel=0' : null,
      playIcon: {
        label: 'Submit search',
        url: '/ui/svg/play-pink.svg'
      },
      hidden: false
    }
  }
  handleClick = () => {
    this.setState({ hidden: true })
  }
  render() {
    return (
      <section
        className={`accent accent--shallow blockfeaturedvideo wrapper ${this.props.className}`}
      >
        <figure>
          <div className="blockfeaturedvideo__titlebox ">
            <span>{this.props.source}</span>
            <h4>{this.props.title}</h4>
          </div>
          {this.state.url && (
            <iframe
              src={this.state.url}
              width="100%"
              frameBorder="0"
              allowFullScreen="allowfullscreen"
            ></iframe>
          )}
          {this.props.figCaption && (
            <figcaption className={'sr-only'}>
              {this.props.figCaption}
            </figcaption>
          )}
        </figure>

        <div className="blockfeaturedvideo__titlebox blockfeaturedvideo__titlebox--horizontal">
          <span>{this.props.source}</span>
          <h4>{this.props.title}</h4>
        </div>
      </section>
    )
  }
}

BlockFeaturedVideo.defaultProps = {
  className: ''
}

export default BlockFeaturedVideo
