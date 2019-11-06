# Interview Scheduler
Interview scheduler is a single page application built with React and Axios. It allows users to schedule appointments with interviewers. There are 5 appointment times available per day. If an appointment is booked, the number of spots available on that day decreases. If an appointment is cancelled, the number increases. Data is persisted by the API server using a PostgreSQL database.


Tests created using Jest, Cypress, and Storybook. 

!["screenshot of main page"](https://github.com/emi-hi/scheduler/blob/master/docs/main_app.png)

to add a new appointment, click the plus sign on an empty timeslot, a form will pop up
!["add a new appointment"](https://github.com/emi-hi/scheduler/blob/master/docs/add_appointment.png)

if the user doesn't enter a name, an error appears
!["error: enter a name"](https://github.com/emi-hi/scheduler/blob/master/docs/error_interviewer.png)

if the user doesn't select an interviewer, an error appears
!["error: choose an interviewer](https://github.com/emi-hi/scheduler/blob/master/docs/error_student.png)

after appointment is created, it appears on the day where it used to be empty
!["new appointment"](https://github.com/emi-hi/scheduler/blob/master/docs/confirmed_appointment.png)

 The app uses websocket so if a user makes a modification, other users see the changes instantly.
!["Two browsers looking at the same day"](https://github.com/emi-hi/scheduler/blob/master/docs/websocket_1.png)
!["one browser cancels"](https://github.com/emi-hi/scheduler/blob/master/docs/websocket_2.png)
!["The other browser instantly sees the change"](https://github.com/emi-hi/scheduler/blob/master/docs/websocket_3.png)

## Setup
Fork this repository, then clone your fork of this repository.
Install dependencies with `npm install`.

### Dependencies
  • axios
  • classnames
  • normalize.css
  • react
  • react-dom
  • react-hooks-testing-library
  • react-scripts
  • ws

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Behavioral Requirements
• Interviews can be booked between Monday and Friday.
• A user can switch between weekdays.
• A user can book an interview in an empty appointment slot.
• Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
• A user can cancel an existing interview.
• A user can edit the details of an existing interview.
• The list of days informs the user how many slots are available for each day.
• The expected day updates the number of spots available when an interview is booked or canceled.
• A user is presented with a confirmation when they attempt to cancel an interview.
• A user is shown an error if an interview cannot be saved or deleted.
• A user is shown a status indicator while asynchronous operations are in progress.
• When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
• The application makes API requests to load and persist data. We do not lose data after a browser refresh.