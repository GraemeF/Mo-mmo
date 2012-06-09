var Feature = require("vows-bdd").Feature;

var _ref = require("./helpers");
var Character = _ref.Character;
var Events = _ref.Events;

Feature("Character management", module)

    .scenario("Create a new character")
    .given(Events.Named_AreSubscribedTo("characterCreated"))
    .when(Character._IsCreatedWithName_(1, 'bob'))
    .then(Events.ShouldDescribeTheCreationOfCharacter_Named_(1, 'bob'))
    .complete()

    .scenario("Delete a character")
    .given(Events.Named_AreSubscribedTo("characterDeleted"))
    .when(Character._IsCreatedWithName_(1, 'bob'))
    .and(Character._IsDeleted(1))
    .then(Events.ShouldDescribeTheDeletionOfCharacter_(1))
    .complete()

    .finish(module);
