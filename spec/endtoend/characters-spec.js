var Feature = require("vows-bdd").Feature;
var Server = require('./helpers').Server;
var Character = require('./helpers').Character;

Feature("Characters", module)
    .scenario("Create a new character")
    .given(Server.HasBeenStarted())
    .when(Character.IsCreatedWithName_('bob'))
    .then(Character._ShouldBeShown('bob'))
    .complete()
    .finish(module);
