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
	storeCharacter: Sinon.spy()

Feature("deleteCharacterHandler", module)
	.scenario("Delete a character")

	.given "a character repository with character 1", ->
		@callback()

	.and "a delete character command", ->
		@command =
			name: "deleteCharacter"
			data:
				id: 1
		@callback()

	.and "a DeleteCharacterHandler", ->
		@handler = new DeleteCharacterHandler(fakeRepo)
		@callback()

	.when "I handle the deleteCharacter command", ->
		@handler.handle @command
		@callback()

	.then "it should delete the character", ->
		Sinon.assert.called fakeCharacter.delete

	.and "it should store the character in the repository", ->
		Sinon.assert.calledWith fakeRepo.storeCharacter, fakeCharacter

	.complete()
	.finish(module)