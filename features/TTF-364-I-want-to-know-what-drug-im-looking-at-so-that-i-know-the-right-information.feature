# TTF-364-I-want-to-know-what-drug-im-looking-at-so-that-i-know-the-right-information.feature
@ignore #duplicate of TTF-448
Feature: TTF-364 View the correct drug information
  AS a considerer
  I WANT to know what drug I'm looking at the information for
  SO THAT I know I'm looking for the right information

  @ignore
  Scenario: View the correct page title
    Given that I have linked through to a drugs page
    When the page has loaded
    Then I should see the name of the drug this page represents as the page title

  @ignore
  Scenario: View slag name highlighted
    Given I have come to this page by clicking on or searching for a slang name
    When the page is loaded
    Then I should be able to see the slang name highlighted