// Setup some stuff
const http = require('http');
const express = require('express');     // Using Express app for communications
const cors = require('cors');           // CORS
const path = require('path');
// const body_parser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.static("express"));
const port = 3000;
const server = http.createServer(app);
// app.use(body_parser.json());
app.use(cors());

// Default URL for website
app.use('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

// GET 
app.get('/', (req, res) => {
    res.json(`Request received`);
});

// Start listening
server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
