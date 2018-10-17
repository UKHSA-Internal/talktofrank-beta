Feature: TTF-369 I want to know the effects on my behaviour
  AS A considerer
  I WANT to know how a drug will make me behave
  SO THAT I can make an informed decision

  Scenario: See content explaining the effects on behavious
    Given I'm a considerer
    When I am on a drug details page
    Then I should see content explaining how the drug will make me act under its influence

  @wip
  Scenario: Don't see empty section
    Given There is content in this section
    When I am on a drug details page
    When I don't see this section