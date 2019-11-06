const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function getSpots(stateDays, stateAppointments, bookedId, bookedInterview) {
  const days = stateDays.map(item => {
    let newObj = { ...item };
    if (item["appointments"].includes(bookedId)) {
      if (
        bookedInterview !== null &&
        stateAppointments[bookedId]["interview"] === null
      ) {
        newObj["spots"]--;
      } else if (
        bookedInterview === null &&
        stateAppointments[bookedId]["interview"] !== null
      ) {
        newObj["spots"]++;
      }
    }
    return newObj;
  });
  return days;
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      const days = getSpots(
        state.days,
        state.appointments,
        action.id,
        action.interview
      );

      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW };
