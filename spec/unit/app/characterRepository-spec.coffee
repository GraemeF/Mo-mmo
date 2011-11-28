util = require "util"
log = require '../../../lib/logger'
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

CharacterRepository = require "../../../lib/app/characterRepository"

class FakeCharacter
	constructor: (@events) ->

repo = null
character = null
domainEvents = null
someEvents = null
fakeEventStore = null
expectedCommits = null
eventsInStore = null

ACharacterRepository = () ->
	[
		"a character repository",
		->
			repo = new CharacterRepository(fakeEventStore, domainEvents, FakeCharacter)
			@callback()
	]
ADomainEventsPublisher = () ->
	[
		"a domain events publisher",
		->
			domainEvents =
				publish: Sinon.spy()
			@callback()
	]
AnEventStoreWithEvents_ = (events) ->
	[
		"an event store with events #{JSON.stringify events}",
		->
			character = null
			eventsInStore = events
			fakeEventStore =
				append: Sinon.spy()
				events: events

			@callback()
	]

assertSpyWasCalledWithEvents = (spy, expectedEvents) ->
	Sinon.assert.called spy
	call = spy.getCall 0
	actualEvents = call.args[0]
	assert.equal actualEvents, expectedEvents

Feature("CharacterRepository", module)
	.scenario("Add a new character")

	.given(AnEventStoreWithEvents_ [])
	.and(ADomainEventsPublisher())
	.and(ACharacterRepository())
	.and "a character with an uncommitted event", ->
		expectedCommits = [{name: "some event"}]
		character =
			id: 1
			uncommittedEvents: expectedCommits
		@callback()

	.when "I add a character to the repository", ->
		repo.storeCharacter character
		@callback()

	.then "it should append the uncommitted events to the event store", =>
		assertSpyWasCalledWithEvents fakeEventStore.append, expectedCommits

	.and "it should publish the events", ->
		assertSpyWasCalledWithEvents domainEvents.publish, expectedCommits

	.complete()

	.scenario("Store a character")

	.given(AnEventStoreWithEvents_ [])
	.and(ADomainEventsPublisher())
	.and(ACharacterRepository())
	.and "a character with an uncommitted event", ->
		character =
			id: 1
			uncommittedEvents: expectedCommits
		@callback()

	.when "I store a character to the repository", ->
		repo.storeCharacter character
		@callback()

	.then "it should append the uncommitted events to the event store", =>
		assertSpyWasCalledWithEvents fakeEventStore.append, expectedCommits
	.and "it should publish the events", ->
		assertSpyWasCalledWithEvents domainEvents.publish, expectedCommits
	.and "it should clear the uncommitted events", ->
		assert.isEmpty character.uncommittedEvents

	.complete()

	.scenario("Get a character")

	.given(AnEventStoreWithEvents_ [{name: "some event", data: "some data"}])
	.and(ADomainEventsPublisher())
	.and(ACharacterRepository())
	.when "I get a character from the repository", ->
		character = repo.getCharacter 1
		@callback()

	.then "it should get a character with the loaded events", ->
		assert.equal character.events, eventsInStore

	.complete()
	.finish(module)