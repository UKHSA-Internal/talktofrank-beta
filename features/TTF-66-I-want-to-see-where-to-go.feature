@wip
  Feature: TTF-66 I want to see where to go
    AS a user
    I WANT to see where to go on the site to find the information I want
    SO THAT I can get there

    Scenario:  See all the main sections
      Given I want to see specific Talk to Frank information or be able to contact Talk to Frank
      When I am on any page of the website
      Then I should see all of the main sections of the site clearly

    Scenario: Easily navigate to all of the main pages
      Given I am at any page of the website
      When I want to be at any other page of the website
      Then I should be able to easily navigate to all of the main pages of the site