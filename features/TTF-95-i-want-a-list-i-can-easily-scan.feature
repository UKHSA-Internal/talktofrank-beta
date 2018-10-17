Feature: TTF-95 I want a list I can easily scan
  AS A user
  I WANT a list that I can easily scan
  SO THAT I can find the drug I want

  Scenario Outline: I should see a list of all drugs
    Given I am on the drugs a-z
    When I look at the list of drugs
    Then I should be able to see a list item for all "<drugs>" that have a page on the site

  Examples:
    | drugs |
    | cannabis |
    | cocaine |

  Scenario Outline: I should be able to see street names
    Given I am on the drugs a-z
    When I look at the list of drugs
    Then I should be able to see some of the "<street names>" associated with each of the drugs

  Examples:
    | street names |
    | White |
    | Wash |
    | Toot |
    | Stones |
    | Snow |
    | Rocks |
    | Percy |
    | Pebbles |
    | Freebase |
    | Crack |
    | Coke |
    | Ching |
    | Charlie |
    | Chang |
    | C |

  Scenario: I should be able to click through to drugs page
    Given I am on the drugs a-z
    When I look at the list of drugs
    Then I should be able to click through to the drugs pages

  Scenario: I should be able to differentiate between slang and real names
    Given I am on the drugs a-z
    When I look at the list of drugs
    Then I should be able to differentiate the street names from the real names