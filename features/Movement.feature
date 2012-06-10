Feature: Movement

  Scenario: Begin moving
    Given character 1 exists
    When I move character 1 towards [10, 0, 0]
    And I wait for character 1 to reach [10, 0, 0]
    Then I should receive events describing the movement of character 1 towards [10, 0, 0]
    And I should receive a characterMoved event for character 1
