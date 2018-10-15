Feature: TTF-372 I want to know the risks
  AS a considerer
  I WANT to know the risks of taking the drug
  SO THAT I can make an informed decision

  Scenario: See physical risks
    Given I'm a considerer
    When I am on a drug details page
    Then I want to see information about the physical risks of taking the drug

  @wip
  # content doesn't currentl exist for this
  Scenario: See legal risks
    Given I'm a considerer
    When I am on a drug details page
    Then I want to see information about the legal risks of taking the drug

  @wip
  Scenario: Don't see section header where content missing
    Given There is no content in this section
    When I am on a drug details page
    Then I don't see this section