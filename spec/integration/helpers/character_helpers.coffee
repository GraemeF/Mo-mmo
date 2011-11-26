command = require "./command_helpers"
log = require '../../../lib/logger'
log.debug "Loading #{__filename}"

character =
	move: (characterId, offset, callback) ->
		command.send
			name: "move character"
			commandData:
				id: characterId
				offset: offset
			callback
		return
	create: (characterId, callback) ->
		command.send
			name: "addCharacter"
			commandData:
				id: characterId
			callback
		return

module.exports = character