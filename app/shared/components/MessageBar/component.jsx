import React from 'react'
import AlertWarningBar from '../AlertWarningBar/component'
import AlertSiteMessage from '../AlertSiteMessage/component'

const MessageContent = props => {
  return (
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
  )
}

const MessageBar = (props) => {
  if (props.disabled) {
    return null
  }
  return (
    <React.Fragment>
      {props.position === 'body'
        ? <MessageContent {...props}/>
        : (
          <React.Fragment>
            { props.messageType === 'alertDrugWarning' ? (
              <AlertWarningBar alertId={props.id}>
                <MessageContent {...props}/>
              </AlertWarningBar>
            ) : props.messageType === 'alertSiteMessage' ? (
              <AlertSiteMessage
                alertId={props.id}
                 {...props}
              />
            ) : (
              null
            )}
            </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default MessageBar
