logger = require '../logger'
Character = require './Character'

class AddCharacterHandler
	constructor: (@characterRepo) ->

	handle: (command, callback) ->
		character = new Character command.data.id, command.data.name
		@characterRepo.addCharacter character, callback

	handlerFactories: {}

module.exports = AddCharacterHandler