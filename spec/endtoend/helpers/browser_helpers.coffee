zombie = require("zombie")
assert = require("assert")

theBrowser = null

browser = (callback) ->
	if !(theBrowser?)
		zombie.visit 'http://localhost:3003/', (err, newBrowser, status) ->
			theBrowser = newBrowser
			callback err, newBrowser, status
	else
		callback null, theBrowser

module.exports =
	createCharacter: (name, callback) ->
		console.log "Creating #{name}"
		browser (err, browser) ->
			if err
				callback err, null
			browser.fill('newCharacterName', name).pressButton('Create', callback)