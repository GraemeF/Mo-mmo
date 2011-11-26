command = require "./command_helpers"
log = require '../../../lib/logger'
log.debug "Loading #{__filename}"

character =
	move: (characterId, offset, callback) ->
		command.send
			name: "move character"
			data:
				id: characterId
				offset: offset
			callback
		return
	create: (characterId, callback) ->
		command.send
			name: "addCharacter"
			data:
				id: characterId
			callback
		return

module.exports = character