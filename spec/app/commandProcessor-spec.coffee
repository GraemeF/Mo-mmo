{Feature} = require "vows-bdd"
vows = require 'vows'
Sinon = require "sinon"

CommandProcessor = require '#{__dirname}/../../lib/app/commandProcessor'

fakeHandler = () ->
	handle: (command, callback) -> callback null, null

fakeHandlerFactory = (handler) ->
	createHandler: () -> handler

Feature("commandProcessor", module)
	.scenario("Process a known command")

	.given "a command processor", ->
		@processor = new CommandProcessor()
		process.nextTick @callback

	.and "there is handler for foo commands", ->
		@fooHandler = fakeHandler()
		Sinon.spy @fooHandler, "handle"
		@fooHandlerFactory = fakeHandlerFactory(@fooHandler)
		Sinon.spy @fooHandlerFactory, "createHandler"
		@processor.handlerFactories.foo = @fooHandlerFactory
		process.nextTick @callback

	.and "a foo command", ->
		@command = {name: "foo", data: "bar"}
		process.nextTick @callback

	.when "it is asked to handle a command", ->
		@processor.handle @command, @callback

	.then "it should create the appropriate handler", ->
		Sinon.assert.called @fooHandlerFactory.createHandler

	.and "it should ask the handler to handle the command", ->
		Sinon.assert.calledWith @fooHandler.handle, @command

	.complete()
	.finish(module)