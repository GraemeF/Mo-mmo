commandClient = require "./command_helpers"
log = require '../../../lib/logger'

character =
	move: (characterId, offset, callback) ->
		command =
			name: "move character"
			data:
				id: characterId
				offset: offset,
		commandClient.send command, callback
		return
	create: (id, name, callback) ->
		command =
			name: "addCharacter"
			data:
				id: id
				name: name
		commandClient.send command, callback
	delete: (id, callback) ->
		command =
			name: "deleteCharacter"
			data:
				id: id
		commandClient.send command, callback
		return

module.exports = character