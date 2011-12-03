log = require '../../../lib/logger'
browser = require './browser_helpers'

character =

	IsCreatedWithName_: (name) ->
		[
			"character is created with name '#{name}'",
			->
				browser.createCharacter name, @callback
		]
	_ShouldBeShown: (name) ->
		[
			"character '#{name}' should be shown",
			->
				browser.characters @callback
		]

module.exports = character