export default function getAppointmentsForDay(state, day) {
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

