const cors = require('cors');
const express = require('express');
const fs = require('fs')
const cars = require('./cars.json');
const players = require('./players.json');
const buisness = require('./buisness.json');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        key: 'Hello World!',
    });
});
app.get('/cars', (req, res) => {
    res.json({
        cars: cars
    });
})
app.get('/biznes', (req, res) => {
    res.json({
        biznes: buisness
    })
})
app.get("/players", (req, res) => {
    res.json({
        players: players
    })
})

app.listen(8000, () => {
    console.log('Server listening');
});

