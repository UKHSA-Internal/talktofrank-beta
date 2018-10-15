@wip
Feature: TTF-375 Know the legal risks of using the drug
  AS A considerer
  I WANT  to know the class of the drug
  SO THAT I know the legal risks of using the drug

  Scenario: See what class means
    Given I'm a considerer
    When I am on a drug details page
    Then I want to read an explanation of what class means

  Scenario: See implications of being caught
    Given I'm a considerer
    When I am on a drug details page
    Then I want to read about the legal implications of being caught in possession of that class of drug

  Scenario: See what class the drug falls into
    Given I'm a considerer
    When I am on a drug details page
    Then I want to see an explanation of which particular class each drug falls into

  @wip
  Scenario: Don't see empty section
    Given There is no content in this sectio
    When I am on a drug details page
    Then I don't see this section