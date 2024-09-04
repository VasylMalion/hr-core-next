import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I am logged in as a user', () => {
  // Visit the login page
  cy.visit('http://localhost:3000/en/login')

  // Fill out login form
  cy.wait(500) // Зачекати 500 мс або більше
  cy.get('input[placeholder="Email"]').type('vasamalon@gmail.com')
  cy.get('input[placeholder="Password"]').type('12345678q')

  // Submit login form
  cy.get('[data-testid="login-btn"]').click()

    cy.wait(3000) // Зачекати 500 мс або більше
    cy.url().should('include', 'http://localhost:3000/en/dashboard')
})

// Given step for visiting the employees list page
Given('I visit the employees list page', () => {
  cy.visit('http://localhost:3000/en/employees')
})

// When step for typing into the search input
When('I type {string} into the search input', (filterValue: string) => {
  cy.wait(500) // Зачекати 500 мс або більше

  cy.get('input[placeholder="Search"]').type(filterValue)
})

Then('I should see the employee {string} in the list', (employeeName: string) => {
  cy.get('tbody')
    .find('tr')
    .contains(employeeName)
    .should('be.visible')
    .click()
})

// Then step for verifying the empty state message
Then('I should see an empty state message', () => {
  cy.get('[data-testid="empty-list"]').should('be.visible')
})
