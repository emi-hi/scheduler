# Interview Scheduler
Interview scheduler is an app built with React and Axios. It allows users to schedule appointments with interviewers. There are 5 appointment times available per day. If an appointment is booked, the number of spots available on that day decreases. If an appointment is cancelled, the number increases. 


Tests created using Jest, Cypress, and Storybook. 


!["screenshot of main page"]("https://github.com/emi-hi/scheduler/blob/master/docs/main_app.png")

to add a new appointment, click the plus sign on an empty timeslot, a form will pop up
!["add a new appointment"]("https://github.com/emi-hi/scheduler/blob/master/docs/add_appointment.png")

if the user doesn't enter a name, an error appears
!["error: enter a name"]("https://github.com/emi-hi/scheduler/blob/master/docs/error_student.png")

if the user doesn't select an interviewer, an error appears
!["error: choose an interviewer]("https://github.com/emi-hi/scheduler/blob/master/docs/error_interviewer.png")

after appointment is created, it appears on the day where it used to be empty
!["new appointment"]("https://github.com/emi-hi/scheduler/blob/master/docs/confirmed_appointment.png")

 The app uses websocket so if a user makes a modification, other users see the changes instantly.
!["Two browsers looking at the same day"]("https://github.com/emi-hi/scheduler/blob/master/docs/websocket_1.png")
!["one browser cancels"]("https://github.com/emi-hi/scheduler/blob/master/docs/websocket_2.png")
!["The other browser instantly sees the change"]("https://github.com/emi-hi/scheduler/blob/master/docs/websocket_3.png")

## Setup
Fork this repository, then clone your fork of this repository.
Install dependencies with `npm install`.

### Dependencies
    -axios
    -classnames
    -normalize.css
    -react
    -react-dom
    -react-hooks-testing-library
    -react-scripts
    -ws
    -cypress

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
