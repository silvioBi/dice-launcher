const express = require('express')

// Enviroment variables
const PORT = process.env.PORT || 80
const DEBUG = process.env.DEBUG || false

// Express
let app = express()
app.use(express.json())

/**
 * Simply launches some dice
 * @argument {object} slots The slots of the intent request
 * @returns {string} Alexa answer
 */
throwDice = slots => {
    let dice = slots.dice && slots.dice.value ? parseInt(slots.dice.value) : 1 // Default is one dice
    let faces = slots.faces && slots.faces.value ? parseInt(slots.faces.value) : 4 // and 4 faces

    let results = new Array(dice)
        .fill(0) // Just create an array full of zeros
        .map(() => 1 + Math.floor(Math.random() * Math.floor(faces))) // Launch the dice!
        .join('<break time="500ms"/>') // Add little pauses to let the user understand all the numbers
    return 'Ok, ho ottenuto ' + results
}

// The endpoint
app.post('/', (req, res) => {
    let alexaReq = req.body.request
    switch (alexaReq.type) {
        case 'LaunchRequest': answer = 'Ok, dimmi quanti dadi lanciare!'
        case 'IntentRequest': if (alexaReq.intent.name == 'diceLaunchIntent') answer = throwDice(alexaReq.intent.slots)
    }

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
        version: "1.0",
        response: {
            outputSpeech: {
                type: "SSML",
                ssml: '<speak>' + answer + '</speak>'
            }
        }
    }))
})

app.listen(PORT)
console.log('🚀 Server started on port', PORT)
exports = module.exports = app