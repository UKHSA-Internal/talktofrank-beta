import React from 'react'

const Scripts = ({cacheBusterTS}) => {
  return (
    <React.Fragment>
      <script src={'/ui/js/vendor/promise.polyfill.min.js'}></script>
      <script src={`/ui/js/client.bundle.js?v=${cacheBusterTS}`}></script>
    </React.Fragment>
  )
}

export default Scripts
