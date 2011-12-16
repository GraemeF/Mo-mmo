require ["libs/socket.io"], ->
	socket = io.connect()

	socket.on "characterCreated", (data) ->
		console.log data

	socket.on "characterMoved", (data) ->
		$("#location").text JSON.stringify(data)
