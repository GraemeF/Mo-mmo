log = require '../../../lib/logger'
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

DeleteCharacterHandler = require "../../../lib/app/deleteCharacterHandler"

fakeCharacter =
	delete: Sinon.spy()
fakeRepo =
	getCharacter: (id) ->
		if id == 1
			fakeCharacter
		else
			null

Feature("deleteCharacterHandler", module)
	.scenario("Delete a character")

	.given "a character repository with character 1", ->
		process.nextTick @callback

	.and "a delete character command", ->
		@command =
			name: "deleteCharacter"
			data:
				id: 1
		process.nextTick @callback

	.and "a DeleteCharacterHandler", ->
		@handler = new DeleteCharacterHandler(fakeRepo)
		process.nextTick @callback

	.when "I handle the deleteCharacter command", ->
		@handler.handle @command
		process.nextTick @callback

	.then "it should delete the character", ->
		Sinon.assert.called fakeCharacter.delete

	.complete()
	.finish(module)