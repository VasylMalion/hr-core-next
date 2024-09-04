Feature: Login page

  Scenario: Successful login
    Given I visit the login page
    When I fill in the email with "vasamalon@gmail.com"
    And I fill in the password with "12345678q"
    And I click the login button
    Then I should be redirected to the dashboard page

  Scenario: Failed login with invalid credentials
    Given I visit the login page
    When I fill in the email with "wronguser@example.com"
    And I fill in the password with "wrong password"
    And I click the login button
    Then I should see an error message "Some data are wrong"