process.env.NODE_ENV = 'test'

log = require "../../../lib/logger"

module.exports =
	log:				log
	Character:	require "./character_helpers"
	Server:			require "./server_helpers"