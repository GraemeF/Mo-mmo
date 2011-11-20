{Feature} = require "vows-bdd"
vows = require 'vows'
Sinon = require "sinon"
express = require "express"

CommandServer = require '#{__dirname}/../../lib/app/commandServer'
CommandProcessor = require '#{__dirname}/../../lib/app/commandProcessor'

fakeExpressServer = () ->
	stubServer = express.createServer()
	Sinon.stub stubServer, "listen"
	stubServer.listen.callsArg 1
	return stubServer

Feature("commandServer", module)
	.scenario("Receive a command")
	.given "a command", ->
		@command = {name: "foo", data: "bar"}
		process.nextTick @callback
	.and "there is a listening command server", ->
		server = fakeExpressServer()
		Sinon.stub server, "post", (path, func) => @postReceiver = func
		@processor = new CommandProcessor()
		Sinon.stub @processor, "handle"
		@processor.handle.callsArg 1
		commandServer = new CommandServer(server, @processor)
		commandServer.listen "some port", @callback
	.when "it receives a POSTed command", ->
		@postReceiver {body: @command}, @callback
	.then "it should hand the command to the processor for processing", ->
		Sinon.assert.calledWith @processor.handle, @command
	.complete()
	.finish(module)