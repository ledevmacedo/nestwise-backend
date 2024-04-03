const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/data', (req, res) => {
    axios.get('/')
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error.message);
        });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});