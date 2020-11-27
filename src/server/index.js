/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.listen(port, () => console.log(`Mars Rover app listening on port ${port}!`))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
app.get('/rover-photos/:name', async (req, res) => {
    try {
        const state = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.name}/latest_photos?page=1&api_key=${process.env.API_KEY}`)
        .then(res => res.json());
        res.send({ state });
    } catch (err) {
        console.log('error:', err);
    }
})

