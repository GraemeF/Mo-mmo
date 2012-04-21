Feature: Create character
  In order to play the game
  As a player
  I want to create a character

  Scenario: Add a character
    Given the server has been started
    When I create a character named Bob
    Then a character named Bob should be shown