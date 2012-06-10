Feature: Movement

  Scenario: Begin moving
    Given character 1 exists
    When I move character 1 towards [10, 0, 0]
    Then character 1 should begin moving towards [10, 0, 0]

  Scenario: Reach destination
    Given character 1 exists
    When I move character 1 towards [10, 0, 0]
    Then character 1 should stop at [10, 0, 0]