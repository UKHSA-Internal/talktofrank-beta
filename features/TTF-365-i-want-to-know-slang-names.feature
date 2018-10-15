Feature: TTF-365 I want to know slang terms
  AS A considerer
  I WANT to know what the slang names for a drug are
  SO THAT I can be sure I'm looking at the right drug

  Scenario Outline: I see all the slang names for the drug
    Given that I am on a drugs info page
    When The page is loaded
    Then I can see all "<slang names>" for the drug that are in the cms

    Examples:
      | slang names |
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

  @wip
  Scenario: Don't see an empty section
    Given There is no content
    When I am on a drug details page
    Then I don't see the section