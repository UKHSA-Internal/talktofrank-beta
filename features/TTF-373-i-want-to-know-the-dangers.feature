Feature: TTF-373 I want to know the dangers
  AS A considerer
  I WANT to know if it is dangerous to mix this drug with others
  SO THAT I can stay safe

  Scenario: See dangers of mixing
    Given I'm a considerer
    When I am on a drug details page
    Then I can see details of any particularly dangerous mixes

  @ignore
  Scenario:
    Given I'm a considerer
    When I am on a drug details page
    Then I am not told any mixtures are 'safe'

  @wip
  Scenario: Don't see empty sections
    Given There is no content in this section
    When I am on a drug details page
    Then I don't see this section