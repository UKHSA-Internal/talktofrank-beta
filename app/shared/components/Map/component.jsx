import React from 'react'

export default class GMap extends React.PureComponent {
  componentDidMount() {
    const mapCall = () => {
      if (window.google) {
        const latLong = {lat: this.props.location.lat, lng: this.props.location.lon}
        let map = new google.maps.Map(document.getElementById('map'), {
          center: latLong,
          zoom: 16,
          mapTypeControl: false
        })
        let marker = new google.maps.Marker({
          position: latLong,
          map: map,
          title: this.props.name
        })
      }
    }

    setTimeout(mapCall, 250)
  }

  render() {
    return (
      <section className='map'>
        <div id='map' className='map__content'></div>
      </section>
    )
  }
}
