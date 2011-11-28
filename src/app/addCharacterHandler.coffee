log = require '../logger'
Character = require '../domain/Character'

class AddCharacterHandler
	constructor: (@characterRepo) ->

	handle: (command) ->
		character = new Character command.data.id, command.data.name
		@characterRepo.storeCharacter character

module.exports = AddCharacterHandler