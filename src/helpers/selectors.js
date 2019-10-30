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
};


export function getInterview(state, interview) {
  if (interview === null) {
    return null
  } else {
    let outputInterview = {};
    outputInterview['student'] = interview.student;
    for (let key in state['interviewers']) {
      if (state['interviewers'][key]['id'] === interview.interviewer) {
        outputInterview['interviewer'] = state['interviewers'][key]
      }
    }
  return outputInterview;
  }
}