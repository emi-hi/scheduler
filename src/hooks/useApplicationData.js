import { useEffect, useReducer } from "react";
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
        ...state.appointments[action.id],
        interview: action.interview
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      const days = state.days.map((item) => {
        if (item["appointments"].includes(action.id)) {
          if (action.spotUpdate === 'addInterview') {
            if (state.appointments[action.id]["interview"] === null) {
              item["spots"]--
            }
          } else if (action.spotUpdate === 'removeInterview') {
            item["spots"]++
          }
        } 
        return item
      })
      return { ...state, appointments, days }
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
    dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
  });
  },[]);

  function bookInterview(id, interview) {
    const spotUpdate = 'addInterview'
    return Axios.put(`/api/appointments/${id}`, { interview })
        .then(() => dispatch({ type: SET_INTERVIEW, id, interview, spotUpdate }))
  };

  function cancelInterview(id) {
    const spotUpdate = 'removeInterview'
    return Axios.delete(`/api/appointments/${id}`)
    .then(() => dispatch({ type: SET_INTERVIEW, id, interview:null, spotUpdate }))

  };
  return { state, setDay, bookInterview, cancelInterview };
}