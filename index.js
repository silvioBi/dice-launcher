const express = require('express')

// Enviroment variables
const PORT = process.env.PORT || 80
const DEBUG = process.env.DEBUG || false

// Express
let app = express()

// The endpoint
app.post('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    console.log(req)
    res.send(JSON.stringify({
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: "Plain text string to speak"
            }
        }
    }))
})

app.listen(PORT)
console.log('🚀 Server started on port', PORT)
exports = module.exports = app