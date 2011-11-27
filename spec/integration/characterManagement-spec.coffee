{Feature} = require "vows-bdd"
{log, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

results = {gotEvent: false}

Feature("Character management", module)
	.scenario("Create a new character")
	.given "the event client has connected to the server", ->
		Events.connectClientToServer @callback
	.and "I am watching for character 1 to be created", ->
		Events.subscribe "characterCreated", (data) ->
			log.info "got data!", data
			assert.equal data, {id: 1, name: "bob"}
			results.gotEvent = true
		process.nextTick =>
			log.debug "before callback in add watcher"
			@callback()
			log.debug "after callback in add watcher"
	.when "I create a new character", ->
		log.debug "before create new character"
		Character.create 1, "bob", () =>
			log.debug "before callback in create new character"
			@callback()
			log.debug "after callback in create new character"
	.and "I wait for the event", ->
		Events.waitFor (() -> results.gotEvent), 20, @callback
	.then "a characterCreated event should be published", ->
		assert.equal data, {id: 1, name: "bob"}
	.complete()

	.finish module