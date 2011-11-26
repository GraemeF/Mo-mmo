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
	create: (id, name, callback) ->
		command.send
			name: "addCharacter"
			data:
				id: id
				name: name
			callback
		return

module.exports = character