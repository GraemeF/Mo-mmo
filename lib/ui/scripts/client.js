require(["libs/socket.io", "viewModel"], function () {
    //var socket = io.connect(null, {transports:['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']});
    var socket = io.connect(null, {host:"localhost", transports:['websocket']});
    //var socket = io.connect();
    console.log("IO - socket", socket);
    socket.on("characterCreated", function (data) {
        console.log("characterCreated", data);
        viewModel.characters.push(data);
    });
    return socket.on("characterMoved", function (data) {
        return $("#location").text(JSON.stringify(data));
    });
});
