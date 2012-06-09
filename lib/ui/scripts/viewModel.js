require(["libs/knockout"], function () {
    function ViewModel() {
        var self = this;
        self.characters = ko.observableArray([]);
        self.newCharacterName = ko.observable("");

        self.addCharacter = function () {
            $.ajax({
                       type: "POST",
                       url: "/commands",
                       data: {
                           name: "addCharacter",
                           data: {
                               id: 2,
                               name: this.newCharacterName()
                           }
                       },
                       success: function () {
                           return console.log("Success!");
                       },
                       dataType: "json"
                   });
        };

        self.moveCharacter = function () {
            $.ajax({
                       type: "POST",
                       url: "/commands",
                       data: {
                           name: "moveCharacter",
                           data: {
                               id: 2,
                               location: [
                                   $("input#x").val(),
                                   $("input#y").val(),
                                   $("input#z").val()
                               ]
                           }
                       },
                       success: function () {
                           return console.log("Success!");
                       },
                       dataType: "json"
                   });
        };
    }

    viewModel = new ViewModel();
});