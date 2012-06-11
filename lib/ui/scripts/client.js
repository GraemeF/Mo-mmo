require(["libs/socket.io", "viewModel"], function () {
    var socket = io.connect('http://localhost:3003/');
    socket.on('connect', function () {
        viewModel.connected(true);
    });
    socket.on('disconnect', function () {
        viewModel.connected(false);
    });

    socket.on("characterCreated", function (data) {
        viewModel.characters.push(data);
    });

    socket.on("characterMoved", function (data) {
        $("#location").text(JSON.stringify(data));
    });
});
