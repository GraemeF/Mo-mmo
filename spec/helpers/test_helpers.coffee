Sinon = require "sinon"
assert = require "assert"
http = require "http"

exports.spy = (object,method) ->
  Sinon.spy object, method

exports.stub = (object, method, fn) ->
  Sinon.stub object, method, fn

exports.spyRender = ->
  @response = http.ServerResponse.prototype
  Sinon.spy @response, "render"

exports.assert = assert