require ["client", "libs/knockout", "libs/socket.io"], ->

	class ViewModel
		newCharacterName: ko.observable ""

		addCharacter: ->
			$.ajax
				type: "POST"
				url: "/commands"
				data:
					name: "addCharacter"
					data:
						id: 2
						name: @newCharacterName()
				success: ->
					console.log "Success!"
				dataType: "json"

		moveCharacter: ->
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

	viewModel = new ViewModel()
	ko.applyBindings viewModel