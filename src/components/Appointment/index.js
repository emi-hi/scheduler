import React from "react";
import './styles.scss';
import Show from './Show.js'
import Empty from './Empty.js'
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form.js';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
  <article className="appointment">
    <header>{props.time}</header>
    {mode === EMPTY && <Empty onAdd={()=> {transition(CREATE)}} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    />
    )}
    {mode === CREATE && (
    <Form
    interviewers={[]}
    onCancel={()=>{transition(EMPTY)}} />
    )}
  </article>
  
  )
}