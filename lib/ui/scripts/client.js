
require(["libs/socket.io"], function() {
  var socket;
  socket = io.connect();
  socket.on("characterCreated", function(data) {
    return console.log(data);
  });
  return socket.on("characterMoved", function(data) {
    return $("#location").text(JSON.stringify(data));
  });
});
