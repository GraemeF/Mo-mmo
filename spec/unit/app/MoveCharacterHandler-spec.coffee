log = require '../../../lib/logger'
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

MoveCharacterHandler = require "../../../lib/app/MoveCharacterHandler"

Feature("MoveCharacterHandler", module)
	.scenario("Begin moving a character")

	.given "the repository contains a character at 0,0,0", ->
		@character =
			location: {x:0,y:0,z:0}
			move: Sinon.spy()

		@repo =
			getCharacter: (id) =>
				if id == 1
					@character
				else
					null
			storeCharacter: Sinon.spy()

		@callback()

	.and "a command to move character 1 to 10,0,0", ->
		@targetLocation =
			x: 10
			y: 0
			z: 0
		@command =
			name: "moveCharacter"
			data:
				id: 1
				location: @targetLocation

		@callback()

	.and "a MoveCharacterHandler", ->
		@handler = new MoveCharacterHandler(@repo)
		@callback()

	.when "I handle the moveCharacter command", ->
		@handler.handle @command
		@callback()

	.then "it should move the character", ->
		Sinon.assert.calledWith @character.move, @targetLocation

	.and "it should store the character in the repository", ->
		Sinon.assert.calledWith @repo.storeCharacter, @character

	.complete()
	.finish(module)