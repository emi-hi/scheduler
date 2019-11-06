//functions that are passed to components/application.js

//makes a list of all appointments for selected day
export function getAppointmentsForDay(state, day) {
  let filteredApps = [];
  for (let days of state.days) {
    if (days.name === day) {
      filteredApps = days.appointments.map(
        appointment => state.appointments[appointment]
      );
    }
  }
  return filteredApps;
}

//makes an object that is passed to Appointment component. 
//it returns the outputinterview for each of the timeslots in the day
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } else {
    let outputInterview = {};
    outputInterview["student"] = interview.student;
    for (let key in state["interviewers"]) {
      if (state["interviewers"][key]["id"] === interview.interviewer) {
        outputInterview["interviewer"] = state["interviewers"][key];
      }
    }
    return outputInterview;
  }
}

//makes a list of interviewers for each day.
export function getInterviewersForDay(state, day) {
  let filteredInterviewers = [];
  for (let days of state.days) {
    if (days.name === day) {
      filteredInterviewers = days["interviewers"].map(
        interviewer => state.interviewers[interviewer]
      );
    }
  }
  return filteredInterviewers;
}
