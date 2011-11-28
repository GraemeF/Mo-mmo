log = require '../../../lib/logger'
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

CharacterRepository = require "../../../lib/app/characterRepository"

class FakeCharacter
	constructor: (@id, @events) ->

fakeEventStore = null
repo = null
character = null
domainEvents = null
someEvents = null

assertSpyWasCalledWithEvents = (spy, expectedEvents) ->
	Sinon.assert.called spy
	call = spy.getCall 0
	actualEvents = call.args[0]
	assert.equal actualEvents, expectedEvents

Feature("CharacterRepository", module)
	.scenario("Add a new character")

	.given "an empty event store", ->
		fakeEventStore =
			append: Sinon.spy()
		process.nextTick @callback

	.and "domain events", ->
		domainEvents =
			publish: Sinon.spy()
		process.nextTick @callback

	.and "a character repository", ->
		repo = new CharacterRepository(fakeEventStore, domainEvents)
		process.nextTick @callback

	.and "a character with an uncommitted event", ->
		character =
			id: 1
			uncommittedEvents: [{name: "some event"}]
		process.nextTick @callback

	.when "I add a character to the repository", ->
		repo.addCharacter character
		process.nextTick @callback

	.then "it should append the uncommitted events to the event store", ->
		assertSpyWasCalledWithEvents fakeEventStore.append, character.uncommittedEvents

	.and "it should publish the events", ->
		assertSpyWasCalledWithEvents domainEvents.publish, character.uncommittedEvents

	.complete()

	.scenario("Get a character")

	.given "an event store with an event", ->
		someEvents = [{name: "some event", data: "some data"}]
		character = null
		fakeEventStore =
			append: Sinon.spy()
			events: someEvents
		process.nextTick @callback

	.and "domain events", ->
		domainEvents =
			publish: Sinon.spy()
		process.nextTick @callback

	.and "a character repository", ->
		repo = new CharacterRepository(fakeEventStore, domainEvents, FakeCharacter)
		process.nextTick @callback

	.when "I get a character from the repository", ->
		character = repo.getCharacter 1
		process.nextTick @callback

	.then "it should get a character with the loaded events", ->
		assert.equal character.id, 1
		assert.equal character.events, someEvents

	.complete()
	.finish(module)