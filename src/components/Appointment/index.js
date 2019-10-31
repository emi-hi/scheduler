import React from "react";
import './styles.scss';
import Show from './Show.js'
import Empty from './Empty.js'
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form.js';
import Status from './Status.js'
import Confirm from './Confirm.js'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function cancel() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => console.log(err))
  }

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((err) => console.log(err))
  }

  return (
  <article className="appointment">
    <header>{props.time}</header>
    {mode === EMPTY && <Empty onAdd={()=> {transition(CREATE)}} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={()=>{transition(CONFIRM)}}
    onEdit={()=>{
      transition(EDIT)}}
    />
    )}
    {mode === CREATE && (
    <Form
    interviewers={props.interviewers}
    onSave={(name, interviewer) => save(name, interviewer)}
    onCancel={()=>{transition(EMPTY)}} 
    />
    )}
    {mode === SAVING && (
      <Status
      message={SAVING}
      />
    )}
    {mode === DELETING && (
      <Status
      message={DELETING}
      />
    )}
    {mode === CONFIRM && (
      <Confirm
      onConfirm={cancel}
      onCancel={back}
      />
    )}
    {mode === EDIT && (
      <Form
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      student={props.interview.student}
      onSave={save}
      onCancel={back}
      />
    )}
  </article>
  
  )
}