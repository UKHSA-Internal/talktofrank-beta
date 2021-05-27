import React from 'react'
import { SwiperSlide } from 'swiper/react'
import SwiperCore, { A11y } from 'swiper'
import Icon from '../Icon/component'
SwiperCore.use([A11y])

class CarouselSlide extends React.Component {
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
    // eslint-disable-next-line
    if (this.state.ref.current && this.state.ref.current.id == id) {
      this.setState({ visible: !this.state.visible })
    }
  }
  render() {
    return (
      <SwiperSlide key={this.props.id}>
        <div
          ref={this.state.ref}
          id={this.props.id}
          style={{
            position: 'relative',
            background: `url(${this.props.img.fields.file.url}) no-repeat center/cover`,
            width: '100%',
            paddingBottom: '75%',
            margin: '0 auto'
          }}
        >
          {this.props.img.fields.description && (
            <div>
              <button
                aria-label="View image attribution details"
                className="view-attribution"
                onClick={e => this.handleClick(this.props.id)}
              >
                {!this.state.visible ? (
                  <Icon {...this.state.icons.visible} />
                ) : (
                  <Icon {...this.state.icons.hidden} />
                )}
                View attribution
              </button>
              <div
                aria-expanded="true"
                className={
                  'attribution-wrapper ' + (!this.state.visible ? 'hidden' : '')
                }
              >
                <p>{this.props.img.fields.description}</p>
              </div>
            </div>
          )}
        </div>
      </SwiperSlide>
    )
  }
}
export default CarouselSlide
