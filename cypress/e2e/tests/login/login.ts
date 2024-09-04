import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

// Given step for visiting the login page
Given('I visit the login page', () => {
  cy.visit('http://localhost:3000/en/login')
})

// When steps for filling the form
When('I fill in the email with {string}', (email: string) => {
  cy.wait(500) // Зачекати 500 мс або більше
  cy.get('input[placeholder="Email"]').type(email)
})

When('I fill in the password with {string}', (password: string) => {
  cy.wait(500) // Зачекати 500 мс або більше
  cy.get('input[placeholder="Password"]').type(password)
})

When('I click the login button', () => {
  cy.get('[data-testid="login-btn"]').click()
})

// Then step for verifying redirection
Then('I should be redirected to the dashboard page', () => {
  cy.wait(5000) // Зачекати 500 мс або більше
  cy.url().should('include', 'http://localhost:3000/en/dashboard')
})

Then('I should see an error message {string}', (errorMessage: string) => {
  cy.get('.text-red').should('be.visible').and('contain', errorMessage)
})