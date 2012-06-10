Feature: Character management

  Scenario: Create a new character
    Given characterCreated events are subscribed to
    When character 1 is created with name 'bob'
    Then events should describe the creation of character 1 named 'bob'

#    .scenario("Delete a character")
#    .given(Events.Named_AreSubscribedTo("characterDeleted"))
#    .when(Character._IsCreatedWithName_(1, 'bob'))
#    .and(Character._IsDeleted(1))
#    .then(Events.ShouldDescribeTheDeletionOfCharacter_(1))
#    .complete()
#
#    .finish(module);
