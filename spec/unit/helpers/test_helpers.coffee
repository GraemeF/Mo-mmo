Sinon = require "sinon"
assert = require "assert"
http = require "http"

module.exports.spy = (object,method) ->
  Sinon.spy object, method

module.exports.stub = (object, method, fn) ->
  Sinon.stub object, method, fn

module.exports.spyRender = ->
  @response = http.ServerResponse.prototype
  Sinon.spy @response, "render"

module.exports.assert = assert