var Feature, assert, vows;

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

Feature("Share stuff between steps", module).scenario("Set properties on given and when").given("A is set", function() {
  this.A = "A";
  return this.callback();
}).when("I set B", function() {
  var _this = this;
  this.B = "B";
  return process.nextTick(function() {
    return _this.callback();
  });
}).then("A should still be set", function() {
  return assert.equal(this.A, "A");
}).and("B should still be set", function() {
  return assert.equal(this.B, "B");
}).complete().scenario("Do stuff to arrays").given("an array with 1,2,3", function() {
  this.x = [1, 2, 3];
  return this.callback();
}).when("I copy it", function() {
  this.y = this.x.slice(0);
  return this.callback();
}).and("I change the first array", function() {
  this.x.push(4);
  return this.callback();
}).then("the copy should not be affected", function() {
  return assert.deepEqual(this.y, [1, 2, 3]);
}).complete().finish(module);
