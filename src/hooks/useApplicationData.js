import { useEffect, useReducer } from "react";
import Axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

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
      Promise.resolve(promise3)
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = function(event) {
      webSocket.onmessage = function(event) {
        const msg = JSON.parse(event.data);
        const { type, id, interview } = msg;
        if (type === "SET_INTERVIEW") {
          dispatch({ type: SET_INTERVIEW, id, interview });
        }
      };
    };
  });

  function bookInterview(id, interview) {
    return Axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      dispatch({ type: SET_INTERVIEW, id, interview })
    );
  }

  function cancelInterview(id) {
    return Axios.delete(`/api/appointments/${id}`).then(() =>
      dispatch({ type: SET_INTERVIEW, id, interview: null })
    );
  }
  return { state, setDay, bookInterview, cancelInterview };
}
