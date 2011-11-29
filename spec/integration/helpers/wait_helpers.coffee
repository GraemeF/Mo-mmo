log = require '../../../lib/logger'
timers = require 'timers'

wait =
	For_Beats: (beats) ->
		[
			"wait for #{beats} beat#{if beats > 1 then 's' else ''}",
			->
				timers.setTimeout (=> @callback()), beats * 1000
		]

module.exports = wait