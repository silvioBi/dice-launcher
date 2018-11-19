const express = require('express')
const verifier = require('alexa-verifier-middleware')

// Enviroment variables
const PORT = process.env.PORT || 80
const DEBUG = process.env.DEBUG || false

// Express
let app = express()
// Middleware to verify the Signature Certificate URL of Alexa
app.use(verifier)
// Middleware to parse JSON payloads
app.use(express.json())

/**
 * Simply launches some dice
 * @argument {object} slots The slots of the intent request
 * @returns {string} Alexa answer
 */
throwDice = slots => {
    let dice, faces
    try { // Avoid getting invalid numbers
        dice = slots.dice && slots.dice.value ? parseInt(slots.dice.value) : 1 // Default is one dice
        faces = slots.faces && slots.faces.value ? parseInt(slots.faces.value) : 4 // and 4 faces
    } catch (e) {
        dice = 1
        faces = 4
    }

    let results = new Array(dice)
        .fill(0) // Just create an array full of zeros
        .map(() => 1 + Math.floor(Math.random() * Math.floor(faces))) // Launch the dice!
        .join('<break time="500ms"/>') // Add little pauses to let the user understand all the numbers
    return 'Ok, ho ottenuto ' + results
}

// The endpoint
app.post('/', (req, res) => {
    let answer = ''
    try {
        let alexaReq = req.body.request
        switch (alexaReq.type) {
            case 'LaunchRequest': answer = 'Ok, dimmi quanti dadi lanciare!'
            case 'IntentRequest': if (alexaReq.intent.name == 'diceLaunchIntent') answer = throwDice(alexaReq.intent.slots)
        }
    } catch(e) {
        answer = 'Non ho capito'
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
