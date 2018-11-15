const express = require('express')

// Enviroment variables
const PORT = process.env.PORT || 80
const DEBUG = process.env.DEBUG || false

// Express
let app = express()

// The endpoint
app.post('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    
    // TODO: obtain the variables below from req
    let dice = 10 // The number of dice to launch
    let faces = 6 // The faces of each dice

    let results = new Array(dice)
        .fill(0) // Just create an array full of zeros
        .map(() => 1 + Math.floor(Math.random() * Math.floor(faces))) // Launch the dice!
        .join() // Convert to comma separated string

    let answer = {
        italian: 'Ok, ho ottenuto ' + results,
    }

    res.send(JSON.stringify({
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: answer.italian
            }
        }
    }))
})

app.listen(PORT)
console.log('🚀 Server started on port', PORT)
exports = module.exports = app