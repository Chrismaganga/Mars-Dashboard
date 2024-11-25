require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
// API call to fetch Mars Rover Photos
app.get('/mars-photos/:rover', async (req, res) => {
    const { rover } = req.params;
    try {
        const photos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        res.send({ photos: photos.photos });
    } catch (err) {
        console.error(`Error fetching photos for rover ${rover}:`, err);
        res.status(500).send(`Error fetching photos for rover ${rover}`);
    }
});

// API call to fetch Mars Rover Manifest
app.get('/mars-rover-manifest/:rover', async (req, res) => {
    const { rover } = req.params;
    try {
        const manifest = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        res.send({ manifest: manifest.photo_manifest });
    } catch (err) {
        console.error(`Error fetching manifest for rover ${rover}:`, err);
        res.status(500).send(`Error fetching manifest for rover ${rover}`);
    }
});

// API call to fetch Mars Weather (InSight)
app.get('/mars-weather', async (req, res) => {
    try {
        const weather = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)
            .then(res => res.json());
        res.send({ weather });
    } catch (err) {
        console.error('Error fetching Mars weather:', err);
        res.status(500).send('Error fetching Mars weather');
    }
});

// API call to fetch Near Earth Objects (Asteroids)
app.get('/neo', async (req, res) => {
    try {
        const neoData = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        res.send({ near_earth_objects: neoData.near_earth_objects });
    } catch (err) {
        console.error('Error fetching Near Earth Objects:', err);
        res.status(500).send('Error fetching Near Earth Objects');
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))