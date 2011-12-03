{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
{Server, Character} = require './helpers'

Feature("Characters", module)
	.scenario("Create a new character")
	.given(Server.HasBeenStarted())
	.when(Character.IsCreatedWithName_ 'bob')
	.then(Character._ShouldBeShown 'bob')
	.complete()

	.finish module
