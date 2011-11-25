log = require '../../../lib/logger'
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

AddCharacterHandler = require "../../../lib/app/addCharacterHandler"

fakeRepo = ->
	addCharacter: (character, callback) -> callback()

Feature("addCharacterHandler", module)
	.scenario("Add a new character")

	.given "an empty character repository", ->
		@repo = fakeRepo()
		Sinon.spy @repo, "addCharacter"
		process.nextTick @callback

	.and "an add character command", ->
		@command =
			name: "addCharacter"
			data:
				id: 1
				name: "bob"
		process.nextTick @callback

	.and "an AddCharacterHandler", ->
		@handler = new AddCharacterHandler(@repo)
		process.nextTick @callback

	.when "I handle the addCharacter command", ->
		@handler.handle @command, @callback

	.then "it should add a new character to the repository", ->
		Sinon.assert.called @repo.addCharacter
		call = @repo.addCharacter.getCall 0
		addedCharacter = call.args[0]
		assert.equal addedCharacter.name, "bob"
		assert.equal addedCharacter.id, 1

	.complete()
	.finish(module)