Feature: TTF-72 I want to know what to do when the page doesn't exist
  AS A user
  I WANT to know when a page doesn't exist
  SO THAT I know what to do

  Scenario: I should see a 404 message
    Given I go to a page that does not exist
    When the page loads
    Then I should see a message telling me this page does not exist

  Scenario: I should see options about what to do next
    Given I go to a page that does not exist
    When the page loads
    Then I should see options for what to do next