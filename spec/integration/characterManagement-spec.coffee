{Feature} = require "vows-bdd"
{log, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

Feature("Character management", module)
	.scenario("Create a new character")
	.given(Events.Named_AreSubscribedTo "characterCreated")
	.when(Character._IsCreatedWithName_ 1, 'bob')
	.then(Events.ShouldDescribeTheCreationOfCharacter_Named_ 1, 'bob')
	.complete()

	.scenario("Delete a character")
	.given(Events.Named_AreSubscribedTo "characterDeleted")
	.when(Character._IsCreatedWithName_ 1, 'bob')
	.and(Character._IsDeleted 1)
	.then(Events.ShouldDescribeTheDeletionOfCharacter_ 1)
	.complete()

	.finish module