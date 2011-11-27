process.env.NODE_ENV = 'test'

log = require "../../../lib/logger"

module.exports =
	logger:			log
	Character:	require "./character_helpers"
	Events:			require "./events_helpers"
