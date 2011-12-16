var Character, Events, Feature, Wait, assert, logger, vows, _ref;

Feature = require("vows-bdd").Feature;

_ref = require("./helpers"), logger = _ref.logger, Character = _ref.Character, Events = _ref.Events, Wait = _ref.Wait;

vows = require('vows');

assert = require('assert');

Feature("Movement", module).scenario("Begin moving").given(Character._IsCreatedWithName_(1, "bob")).and(Events.Named_AreSubscribedTo("characterMoving")).and(Events.Named_AreSubscribedTo("characterMoved")).when(Character._BeginsMovingTo_(1, [10, 0, 0])).and(Events.WaitForCharacterToReach_([10, 0, 0])).then(Events.ShouldDescribeCharacter_MovingTowards_(1, [10, 0, 0])).and(Events.ShouldDescribeCharacter_Moved(1)).complete().finish(module);
