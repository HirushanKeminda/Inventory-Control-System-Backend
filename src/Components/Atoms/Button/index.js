import React from 'react'


export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`btn btn-${props.type} ${props.style}`}>{props.label}</button>
    
  )
}
