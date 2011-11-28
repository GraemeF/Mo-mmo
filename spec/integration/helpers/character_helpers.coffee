commandClient = require "./command_helpers"
log = require '../../../lib/logger'

character =
	move: (characterId, location, callback) ->
		command =
			name: "moveCharacter"
			data:
				id: characterId
				location: location,
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