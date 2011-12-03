{exec, spawn} = require 'child_process'

module.exports =
	HasBeenStarted: ->
		[
			"server has been started",
			->
				@server = spawn 'node lib/server'
				@callback()
		]
