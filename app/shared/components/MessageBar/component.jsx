import React from 'react'
import WarningBar from '../WarningBar/component'

const MessageBar = (props) => {
   return (
     <React.Fragment>
       {props.body ? (
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
       ) : props.warningBar ? (
         <WarningBar alertId={props.id}>
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
         </WarningBar>
       ) : (
         null
       )}
     </React.Fragment>
   )

}

export default MessageBar