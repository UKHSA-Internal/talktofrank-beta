import React from 'react'

export default class GMap extends React.PureComponent {
  componentDidMount() {
    const mapCall = () => {
      if (window.google) {
        const latLong = {lat: this.props.location.lat, lng: this.props.location.lon}
        let map = new google.maps.Map(document.getElementById('map'), {
          center: latLong,
          zoom: 14,
          mapTypeControl: false
        })
        let geocoder = new google.maps.Geocoder()
        geocoder.geocode({'address': this.props.address}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location)
            const marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            })
          } else {
            alert('Geocode was not successful for the following reason: ' + status)
          }
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
