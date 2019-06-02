import React from 'react'
import '../index.css'
const Contact = (props) => {
return(
	<div className="contact">
  <div>{ props.name }</div>
  <div>{ props.email }</div>
  <div>{ props.phone }</div>
  <div>{ props.address } { props.suite }</div>
  <div>{ props.city } { props.state }, { props.zip }</div>
 </div>
)
}
export default Contact
