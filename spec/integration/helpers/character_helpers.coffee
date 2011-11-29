commandClient = require "./command_helpers"
log = require '../../../lib/logger'

character =
	_BeginsMovingTo_: (characterId, location) ->
		[
			"character #{characterId} begins moving to #{JSON.stringify location}",
			->
				command =
					name: "moveCharacter"
					data:
						id: characterId
						location: location,
				commandClient.send command, @callback
		]

	_IsCreatedWithName_: (id, name) ->
		[
			"character #{id} is created with name '#{name}'",
			->
				command =
					name: "addCharacter"
					data:
						id: id
						name: name
				commandClient.send command, @callback
		]

	_IsDeleted: (id) ->
		[
			"I delete character #{id}",
			->
				command =
					name: "deleteCharacter"
					data:
						id: id
				commandClient.send command, @callback
		]

module.exports = character