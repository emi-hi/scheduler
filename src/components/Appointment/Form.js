import React, {useState} from "react";
import Button from "../Button.js"
import InterviewerList from "../InterviewerList"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setName("");
    setInterviewer(null);
  }
  const cancel = function() {
    props.onCancel()
    reset();
  }
  
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please choose an interviewer!")   
      return 
    }
    setError("");
    props.onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          value = {name}
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          value={interviewer}
          onChange={setInterviewer}
        />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick = {() => validate()}>Save</Button>
      </section>
    </section>
  </main>
  );
}

