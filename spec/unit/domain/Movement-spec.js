var AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond, Feature, Movement, TheLocationAt_IsCalculated, TheMovementShouldStillBeFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond, TheResultShouldBeApproximately_, assert, log, vows;

Movement = require("../../../lib/domain/Movement");

log = require("../../../lib/logger");

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond = function(source, destination, startTime, speed) {
  return [
    "a movement from " + source + " to " + destination + " starting at " + startTime + "ms at a speed of " + speed + " units/second", function() {
      this.movement = {
        source: source,
        destination: destination,
        startTime: startTime,
        speed: speed
      };
      return this.callback();
    }
  ];
};

TheMovementShouldStillBeFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond = function(source, destination, startTime, speed) {
  return [
    "the movement should still be from " + source + " to " + destination + " starting at " + startTime + "ms at a speed of " + speed + " units/second", function() {
      return assert.deepEqual(this.movement, {
        source: source,
        destination: destination,
        startTime: startTime,
        speed: speed
      });
    }
  ];
};

TheLocationAt_IsCalculated = function(time) {
  return [
    "the location at " + time + "ms is calculated", function() {
      this.result = Movement.calculateLocation(this.movement, time);
      return this.callback();
    }
  ];
};

TheResultShouldBeApproximately_ = function(expected) {
  return [
    "the result should be approximately " + expected, function() {
      return assert.deepEqual(this.result, expected);
    }
  ];
};

Feature("Movement", module).scenario("Calculate a location along a movement").given(AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond([0, 0, 0], [10, 0, 0], 0, 1)).when(TheLocationAt_IsCalculated(2000)).then(TheResultShouldBeApproximately_([2, 0, 0])).and(TheMovementShouldStillBeFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond([0, 0, 0], [10, 0, 0], 0, 1)).complete().scenario("Reach the end of a movement").given(AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond([0, 0, 0], [10, 0, 0], 0, 1)).when(TheLocationAt_IsCalculated(20000)).then(TheResultShouldBeApproximately_([10, 0, 0])).complete().finish(module);
