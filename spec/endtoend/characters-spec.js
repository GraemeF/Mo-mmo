var Character, Feature, Server, assert, vows, _ref;

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

_ref = require('./helpers'), Server = _ref.Server, Character = _ref.Character;

Feature("Characters", module).scenario("Create a new character").given(Server.HasBeenStarted()).when(Character.IsCreatedWithName_('bob')).then(Character._ShouldBeShown('bob')).complete().finish(module);
