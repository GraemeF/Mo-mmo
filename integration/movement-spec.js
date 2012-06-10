//var Feature = require("vows-bdd").Feature;
//
//var _ref = require("./helpers");
//var Character = _ref.Character;
//var Events = _ref.Events;
//
//Feature("Movement", module)
//    .scenario("Begin moving")
//    .given(Character._IsCreatedWithName_(1, "bob"))
//    .and(Events.Named_AreSubscribedTo("characterMoving"))
//    .and(Events.Named_AreSubscribedTo("characterMoved"))
//    .when(Character._BeginsMovingTo_(1, [10, 0, 0]))
//    .and(Events.WaitForCharacterToReach_([10, 0, 0]))
//    .then(Events.ShouldDescribeCharacter_MovingTowards_(1, [10, 0, 0]))
//    .and(Events.ShouldDescribeCharacter_Moved(1))
//    .complete()
//    .finish(module);
