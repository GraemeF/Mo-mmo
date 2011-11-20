command = require "./command_helpers"
logger = require '#{__dirname}/../../../lib/logger'

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
			name: "create character"
			commandData:
				id: characterId
			callback
		return

module.exports = character