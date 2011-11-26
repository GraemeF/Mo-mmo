log = require '../logger'
Character = require '../domain/Character'

class AddCharacterHandler
	constructor: (@characterRepo) ->

	handle: (command, callback) ->
		character = new Character command.data.id, command.data.name
		@characterRepo.addCharacter character, callback

module.exports = AddCharacterHandler