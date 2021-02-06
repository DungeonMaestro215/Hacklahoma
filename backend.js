/* Setup some stuff */
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

// Serve static files
// http://expressjs.com/en/starter/static-files.html
app.use('/static', express.static('static'));
app.use('/pics', express.static('pics'));
app.use('/node_modules', express.static('node_modules'));
// app.use(express.static('node_modules'));

// Default URL for website
app.use('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

/* THESE DON'T WORK ***
// GET 
app.get('/whatever', (req, res) => {
    console.log(req.query.action);
    res.send(`Request received`);
});

// POST 
app.post('/', (req, res) => {
    console.log(req.query.action);
    res.send(`Request received`);
});
*/

// Start listening
server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
