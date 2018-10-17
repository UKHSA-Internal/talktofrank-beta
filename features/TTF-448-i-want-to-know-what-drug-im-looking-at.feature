Feature: TTF-448 I want to know what drug I'm looking at
  AS A considerer
  I WANT to know what drug page I'm looking at
  SO THAT I know I'm in the right place

  Scenario: See main page title
    Given I'm on the drugs a-z
    When I've clicked through on the real name and the drugs info page loads
    Then I see the main name as the page title

  @duplicate
  Scenario: See slang names
    Given I'm on the drugs a-z
    When I've clicked through on the real name and the drugs info page loads
    Then I see the slang names listed underneath

  Scenario: See drug description
    Given I'm on the drugs a-z
    When I've clicked through on the real name and the drugs info page loads
    Then I see the drug description

  Scenario: See the main drug name as page title
    Given I'm on the drugs a-z
    When I've clicked through one a slang name and the drugs info page loads
    Then I see the main drug name as the page title

  @wip
  Scenario: See slang names with highlighted name
    Given I'm on the drugs a-z
    When I've clicked through one a slang name and the drugs info page loads
    Then I see the slang names listed underneath with the slang name I clicked highlighted

  @duplicate
  Scenario: See drug description
    Given I'm on the drugs a-z
    When I've clicked through one a slang name and the drugs info page loads
    Then I see the drug description

  @current
  Scenario: See drug images
    Given The is an image associated with a drug
    When I'm on the drugs info page
    Then I see the image next to the title