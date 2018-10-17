Feature: TTF-360 I want to know what the site is for
  AS A user
  I WANT to know what the site is for and what I can do here
  SO THAT I know I'm in the right place

  Scenario: See a top level CTA
    Given I am on the talktofrank.com homepage
    When I scan the page
    Then I should see a top level CTA or statement explaining this

  @ignore
  Scenario: Recognise what the site is about
    Given I am on the talktofrank.com homepage
    When I scan the page
    Then I should recognise what the site is about and who it is for from the look and feel/design