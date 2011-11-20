process.env.NODE_ENV = 'test'

module.exports =
	logger:			require "#{__dirname}/../../../lib/logger"
	Character:	require "./character_helpers"
	Events:			require "./events_helpers"
