Feature: Employees list

  Scenario: Empty employees list after applying an invalid filter
    Given I am logged in as a user
    And I visit the employees list page
    When I type "InvalidFilter" into the search input
    Then I should see an empty state message

  Scenario: Filter employees by valid name
    Given I am logged in as a user
    And I visit the employees list page
    When I type "Vlad" into the search input
    Then I should see the employee "Vlad" in the list