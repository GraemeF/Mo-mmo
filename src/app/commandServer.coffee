express = require "express"
logger = require '../logger'

app = express.createServer()
app.use express.logger("dev")
app.use express.bodyParser()

app.post '/commands', (req, res) ->
	logger.debug "Received #{JSON.stringify req.body}"
	res.send(200)

module.exports = app