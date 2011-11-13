{Feature} = require "vows-bdd"
{Server, Test} = require "./helpers"
vows = require 'vows'

Feature("Server", module)
  .scenario("Say hello")  
  .given "the server is running", ->
    Server.server.ready @callback
  .when "I visit the server", ->
    Server.get "http://localhost:#{Server.port}/", @callback
  .then "the response should be friendly", (err,response) ->
    Test.assert.equal response.body, "Hello World\n"
  .complete()
  .finish module