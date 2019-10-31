import React from "react";
import './styles.scss';
import Show from './Show.js'
import Empty from './Empty.js'
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form.js';
import Status from './Status.js'
import Confirm from './Confirm.js'
import Error from './Error.js'
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR SAVING"
const ERROR_DELETE = "ERROR DELETING"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function destroy() {
    transition(DELETING,true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true))
  }

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true))
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
      onConfirm={destroy}
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
    {mode === ERROR_SAVE && (
      <Error
      message={"There was an error saving the appointment!"}
      onClose={back}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
      message={"There was an error deleting the appointment!"}
      onClose={back}
      />
    )}
  </article>
  
  )
}