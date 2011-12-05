zombie = require("zombie")
assert = require("assert")
log = require "../../../lib/logger"
util = require "util"

theBrowser = null

browser = (callback) ->
	if !(theBrowser?)
		zombie.visit 'http://localhost:3003/index.html', (err, newBrowser, status) ->
			theBrowser = newBrowser
			log.debug "Browser: ", util.inspect theBrowser
			callback err, newBrowser, status
	else
		callback null, theBrowser

module.exports =
	createCharacter: (name, callback) ->
		console.log "Creating #{name}"
		browser (err, browser) ->
			if err
				callback err, null
			browser.fill('newCharacterName', name).pressButton('createCharacter', callback)