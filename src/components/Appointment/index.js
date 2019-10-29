import React from "react";
import './styles.scss';
import Show from './Show.js'
import Empty from './Empty.js'

export default function Appointment(props) {
  const isBooked = props.interview;
  return (
  <article className="appointment">
    <header>{props.time}</header>
    {isBooked? <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}/>: <Empty />}
        
  </article>
  
  )
}