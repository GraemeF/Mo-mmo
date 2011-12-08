{exec, spawn} = require 'child_process'

executeCommandLine = (commandLine) ->
	commandProcess = exec commandLine
	commandProcess.stdout.pipe process.stdout, { end: false }
	commandProcess.stderr.pipe process.stderr, { end: false }

module.exports =
	HasBeenStarted: ->
		[
			"server has been started",
			->
				@server = executeCommandLine 'node lib/server'
				@callback()
		]