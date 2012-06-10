global.sinon = require("sinon");
global.chai = require("chai");
global.should = require("chai").should();
global.expect = require("chai").expect;
global.AssertionError = require("chai").AssertionError;
global.soon = require('patience').soon;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);