var Sinon, assert, http;

Sinon = require("sinon");

assert = require("assert");

http = require("http");

module.exports.spy = function(object, method) {
  return Sinon.spy(object, method);
};

module.exports.stub = function(object, method, fn) {
  return Sinon.stub(object, method, fn);
};

module.exports.spyRender = function() {
  this.response = http.ServerResponse.prototype;
  return Sinon.spy(this.response, "render");
};

module.exports.assert = assert;
