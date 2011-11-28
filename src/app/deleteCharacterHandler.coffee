log = require '../logger'

class DeleteCharacterHandler
	constructor: (@characterRepo) ->

	handle: (command) ->
		character = @characterRepo.getCharacter command.data.id
		character.delete()

module.exports = DeleteCharacterHandler