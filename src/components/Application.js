import React, {useState, useEffect} from "react";
import Axios from "axios";
import DayList from './DayList.js'
import "components/Application.scss";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const appointments= getAppointmentsForDay(state, state.day)
  useEffect(() => {
    const promise1 = Axios.get("/api/days");
    const promise2 = Axios.get("/api/appointments");
    
   Promise.all([
    Promise.resolve(promise1),
    Promise.resolve(promise2),
    Promise.resolve('third'),
  ]).then((all) => {
    const [first, second, third] = all;
    console.log(all[2])
    console.log(first, second, third);
    setState(prev => ({ days: all[0].data, appointments: all[1].data}));
  });
  },[])
  
  const appArr = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    )
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu" >
      <DayList days={state.days} day={state.day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {appArr}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
