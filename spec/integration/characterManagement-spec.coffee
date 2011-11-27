{Feature} = require "vows-bdd"
{log, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

results = {gotEvent: false}

Feature("Character management", module)
	.scenario("Create a new character")
	.given "I am watching for character 1 to be created", ->
		Events.subscribe "characterCreated", (data) ->
			log.info "got data!", data
			assert.equal data, {id: 1, name: "bob"}
			results.gotEvent = true
		process.nextTick @callback
	.when "I create a new character", ->
		Character.create 1, "bob", @callback
	.then "a characterCreated event should be published", ->
		123
		#process.nextTick ()=>Events.waitFor((() -> results.gotEvent), 100, @callback)
	.complete()

	.finish module