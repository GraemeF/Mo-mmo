log = require "./logger"
app = require "./app"
domain = require "./domain"

log.debug "Loading #{__filename}"

module.exports =
	App: app
	Domain: domain