require ["libs/socket.io"], ->
	console.log "connecting"
	socket = io.connect()
	socket.on "connect", (data) ->
		console.log data
		$.ajax
			type: "POST"
			url: "/commands"
			data:
				name: "addCharacter"
				data:
					id: 2
					name: "Lynn"

			success: ->
				console.log "Success!"

			dataType: "json"

	socket.on "characterCreated", (data) ->
		console.log data

	socket.on "characterMoved", (data) ->
		$("#location").text JSON.stringify(data)

	$(".button").click ->
		$.ajax
			type: "POST"
			url: "/commands"
			data:
				name: "moveCharacter"
				data:
					id: 2
					location: [ $("input#x").val(), $("input#y").val(), $("input#z").val() ]

			success: ->
				console.log "Success!"

			dataType: "json"

		false