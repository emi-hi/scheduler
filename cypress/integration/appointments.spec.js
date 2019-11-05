describe("Appointments", () => {
  it("should book an interview", () => {
  // Visits the root of our web server
  cy.visit("/")
  cy.contains("Monday")
  // Clicks on the "Add" button in the second appointment
  cy.get("[alt=Add]")
  .first()
  .click();
  // Enters their name
  cy.get("[data-testid=student-name-input]")
    .type("Lydia Miller-Jones")
  // Chooses an interviewer

  // Clicks the save button

  // Sees the booked appointment

  })


// Editing
// Visits the root of our web server
// Clicks the edit button for the existing appointment (Archie Cohen)
// Changes the name and interviewer
// Clicks the save button
// Sees the edit to the appointment


// Canceling
// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty

})