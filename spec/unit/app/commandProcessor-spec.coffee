{Feature} = require "vows-bdd"
vows = require 'vows'
Sinon = require "sinon"
assert = require "assert"
log = require "../../../lib/logger"

CommandProcessor = require "../../../lib/app/commandProcessor"

fakeHandlerFactory = (handler) ->

processor = null
thrownError = null

fooHandler =
	handle: (command) ->

fooHandlerFactory =
	createHandler: () -> fooHandler

fooCommand =
	name: "foo"
	data: "bar"

Feature("commandProcessor", module)
	.scenario("Process a known command")

	.given "a command processor", ->
		processor = new CommandProcessor()
		process.nextTick @callback

	.and "there is handler for foo commands", ->
		Sinon.spy fooHandler, "handle"
		Sinon.spy fooHandlerFactory, "createHandler"
		processor.handlerFactories.foo = fooHandlerFactory
		process.nextTick @callback

	.when "it is asked to handle a command", ->
		processor.handle fooCommand
		process.nextTick @callback

	.then "it should create the appropriate handler", ->
		Sinon.assert.called fooHandlerFactory.createHandler

	.and "it should ask the handler to handle the command", ->
		Sinon.assert.calledWith fooHandler.handle, fooCommand
	.complete()


	.scenario("Process an unknown command")

	.given "a command processor", ->
		processor = new CommandProcessor()
		assert.isEmpty processor.handlerFactories
		process.nextTick @callback

	.when "it is asked to handle an unknown command", ->
		try
			processor.handle fooCommand
		catch error
			log.warn error
			thrownError = error
		process.nextTick @callback

	.then "it should throw an error", ->
		assert.equal thrownError, "There is no registered handler for 'foo' commands."

	.complete()
	.finish(module)