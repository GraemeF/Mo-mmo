AddCharacterHandler = require "./addCharacterHandler"

repo = {}

module.exports =
	addCharacter: -> new AddCharacterHandler(repo)