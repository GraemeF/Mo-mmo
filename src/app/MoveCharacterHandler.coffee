log = require '../logger'
Character = require '../domain/Character'

class MoveCharacterHandler
	constructor: (@characterRepo) ->

	handle: (command) ->
		character = @characterRepo.getCharacter command.data.id
		character.move command.data.location, => @characterRepo.storeCharacter character

module.exports = MoveCharacterHandler