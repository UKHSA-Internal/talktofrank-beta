Feature: TTF-370 I want to know how long the high lasts
  AS A considerer
  I WANT to know how long the high of a drug lasts
  SO THAT I can make an informed decision

  Scenario: See content explaining the duration
    Given I'm a considerer
    When I am on a drug details page
    Then I should see content explaining how long the high of a drug will last

  Scenario: See other factors affecting duration
    Given I'm a considerer
    When I am on a drug details page
    Then I should see content explaining about other factors that can affect how long the high of a drug lasts e.g. how much was taken, if it was mixed with anything, the size/age/tolerance of the person taking it

  @wip
  Scenario: Don't see empty section
    Given There is no content in this section
    When I am on a drug details page
    Then I don't see this section