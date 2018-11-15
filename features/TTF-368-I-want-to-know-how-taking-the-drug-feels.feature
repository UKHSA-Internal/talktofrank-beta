Feature: TTF-368 I want to know how taking the drug feels
  AS A considerer
  I WANT to know how taking the drug feels
  SO THAT I can make an informed decision

  Scenario: See information about psychological effects
    Given I'm a considerer
    When I am on a drug details page
    And the page has loaded
    Then I should see information about the behavioural / psychological effects of taking the drug

  @wip
  Scenario: Don't see empty section
    Given There is no content in this section
    When I am on a drug details page
    Then I don't see this section