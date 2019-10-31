import React, { useEffect, useReducer} from "react";
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.inputs.id],
        interview: action.inputs.interview ? { ...action.inputs.interview } : null };
      const appointments = {
        ...state.appointments,
        [action.inputs.id]: appointment
      };
      return { ...state, appointments }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });
  
  useEffect(() => {
    const promise1 = Axios.get("/api/days");
    const promise2 = Axios.get("/api/appointments");
    const promise3 = Axios.get("/api/interviewers");
  Promise.all([
    Promise.resolve(promise1),
    Promise.resolve(promise2),
    Promise.resolve(promise3),
  ]).then((all) => {
    dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
  });
  },[]);

  function bookInterview(id, interview) {
    const inputs = { id, interview };
    return Axios.put(`/api/appointments/${id}`, { interview })
        .then(() => dispatch({ type: SET_INTERVIEW, inputs }));
  };

  function cancelInterview(id) {
    const inputs = { id, interview:null };
    return Axios.delete(`/api/appointments/${id}`)
    .then(() => dispatch({ type: SET_INTERVIEW, inputs }));
  };

  return { state, setDay, bookInterview, cancelInterview };
}