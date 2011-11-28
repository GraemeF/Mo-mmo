log = require '../../../lib/logger'
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

AddCharacterHandler = require "../../../lib/app/addCharacterHandler"

Feature("addCharacterHandler", module)
	.scenario("Add a new character")

	.given "an empty character repository", ->
		@repo =
			storeCharacter: Sinon.spy()
		@callback()

	.and "an add character command", ->
		@command =
			name: "addCharacter"
			data:
				id: 1
				name: "bob"
		@callback()

	.and "an AddCharacterHandler", ->
		@handler = new AddCharacterHandler(@repo)
		@callback()

	.when "I handle the addCharacter command", ->
		@handler.handle @command
		@callback()

	.then "it should store the new character to the repository", ->
		Sinon.assert.called @repo.storeCharacter
		call = @repo.storeCharacter.getCall 0
		addedCharacter = call.args[0]
		assert.equal addedCharacter.name, "bob"
		assert.equal addedCharacter.id, 1

	.complete()
	.finish(module)