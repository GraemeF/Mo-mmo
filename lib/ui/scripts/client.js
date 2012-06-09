require(["libs/socket.io", "viewModel"], function () {
    var socket = io.connect();
    socket.on("characterCreated", function (data) {
        viewModel.characters.push(data);
    });
    return socket.on("characterMoved", function (data) {
        return $("#location").text(JSON.stringify(data));
    });
});
