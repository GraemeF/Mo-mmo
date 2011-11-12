{Server, Test} = require "./helpers"
vows = require 'vows'

Feature "Server", module
  .scenario "Say hello"
  
  .given "the server is running", ->
    Server.ready @callback
    
  .when "I visit the server", ->
    Server.get "http://localhost:#{port}/", @callback
    
  .then "I should see a username field", (err,browser,status) ->
    assert.ok browser.querySelector ":input[name=username]"

  .and "I should see entries for first and last name", (err,browser,status) ->
    assert.ok browser.querySelector ":input[name=firstName]"
    assert.ok browser.querySelector ":input[name=lastName]"

  .and "I should see a password entry", (err,browser,status) ->
    assert.ok browser.querySelector, ":input[name=password]"

  .and "I should see a password confirmation", (err,browser,status) ->
    assert.ok browser.querySelector, ":input[name=passwordConfirm]"

  .when "I submit the form", (browser,status) ->
    browser.fill("username", "test")
           .fill("firstName", "Justin")
           .fill("lastName", "Reidy")
           .fill("password", "foobar")
           .fill("password", "foobar")
           .pressButton "Sign Up!", @callback

  .then "a new User should be created", (err,browser,status) ->
    assert.ok findNewUser()

  .complete()
  .finish(module)