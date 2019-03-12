import React from 'react'
import AlertWarningBar from '../AlertWarningBar/component'
import AlertSiteMessage from '../AlertSiteMessage/component'

const MessageBar = (props) => {
  if (props.disabled) {
    return null
  }

  return (
    <React.Fragment>
      {props.bodyMessage ? (
        <p className='accent__content'>
          <span className='accent__warning'>Drug warning </span>
          <span className='accent__text'>
            { props.url !== false ? (
              <a className='accent__link' href={props.url}>{props.message}</a>
            ) : (
              props.message
            )}
          </span>
        </p>
        ) : props.showPopup ? (
        <React.Fragment>
          { props.messageType === 'alertDrugWarning' ? (
            <AlertWarningBar alertId={props.id}>
              <p className='accent__content'>
                <span className='accent__warning'>Drug warning </span>
                <span className='accent__text'>
                  { props.url !== false ? (
                    <a className='accent__link' href={props.url}>{props.message}</a>
                  ) : (
                  props.message
                  )}
                </span>
              </p>
            </AlertWarningBar>
          ) : props.messageType === 'alertSiteMessage' ? (
            <AlertSiteMessage
               {...props}
            />
          ) : (
            null
          )}
          </React.Fragment>
        ) : (null)
      }
    </React.Fragment>
  )
}

export default MessageBar
