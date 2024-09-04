/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import login from '../../pages/first-page/first-page.cy'
Given('I navigate to the Website', () => {
  login.enterURL()
})
When('I click on Sign In Link', () => {
  login.clickSignInLink()
})
When('I entered valid credential', (datatable) => {
  datatable.hashes().forEach((element) => {
    login.enterEmailPassword(element.email, element.validpassword)
  })
})
When('User click on sign in button', () => {
  login.clickSignButton()
})
Then('Validate user is logged in', () => {
  login.verifyUserLoggedIn()
})
Then('Validate the title after login', () => {
  login.verifyPageTitle()
})
When('I click on Codeless link', () => {
  login.verifyCodelessLink()
})
Then('Validate Codeless link should be open', () => {
  login.verifyCodelessLinkOpen()
})
When('I click logout link', () => {
  login.clickLogoutLink()
})
