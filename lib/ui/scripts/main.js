
require(["client", "libs/knockout", "libs/socket.io"], function() {
  var ViewModel, viewModel;
  ViewModel = (function() {

    function ViewModel() {}

    ViewModel.prototype.newCharacterName = ko.observable("");

    ViewModel.prototype.addCharacter = function() {
      return $.ajax({
        type: "POST",
        url: "/commands",
        data: {
          name: "addCharacter",
          data: {
            id: 2,
            name: this.newCharacterName()
          }
        },
        success: function() {
          return console.log("Success!");
        },
        dataType: "json"
      });
    };

    ViewModel.prototype.moveCharacter = function() {
      return $.ajax({
        type: "POST",
        url: "/commands",
        data: {
          name: "moveCharacter",
          data: {
            id: 2,
            location: [$("input#x").val(), $("input#y").val(), $("input#z").val()]
          }
        },
        success: function() {
          return console.log("Success!");
        },
        dataType: "json"
      });
    };

    return ViewModel;

  })();
  viewModel = new ViewModel();
  return ko.applyBindings(viewModel);
});
