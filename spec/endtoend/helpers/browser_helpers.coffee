zombie = require("zombie")
assert = require("assert")
log = require "../../../lib/logger"
util = require "util"

theBrowser = null

browser = (callback) ->
	if !(theBrowser?)
		zombie = new zombie.Browser
			runScripts: true
			site:"http://localhost:3003"
			debug: false
			userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.59 Safari/535.7"

		zombie.visit '/index.html', (err, newBrowser, status) ->
			theBrowser = newBrowser
			callback err, newBrowser, status
	else
		callback null, theBrowser

module.exports =
	createCharacter: (name, callback) ->
		console.log "Creating #{name}"
		browser((err, browser) ->
			if err
				callback err, null
			browser.fill('newCharacterName', name).pressButton('Add Character', callback))