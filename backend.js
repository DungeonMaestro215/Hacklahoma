const {getAuth} = require('./spotifyAPI.js') ;

/* Setup some stuff */
const http = require('http');
const express = require('express');     // Using Express app for communications
const cors = require('cors');           // CORS
const path = require('path');
// const body_parser = require('body-parser');
const app = express();
app.use(express.json());
// app.use(express.static("express"));
const port = process.env.PORT || 3000;
const server = http.createServer(app);
// app.use(body_parser.json());
app.use(cors());

// Generate random codes
let codes = [{ code: 1 }];

function randomCode(length) {
    var result= '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

app.get('/getCode', async function(req,res) {
    let code = randomCode(5);
    while (codes.reduce((acc, val) => acc || val.code == code), false) {
        code = randomCode(5);
    }

    codes.push({ 
        code: code
    });

    console.log('Codes: ' + codes);
    console.log('Code: ' + code);

    // res.json({ code: code });
    res.send({code});
});


//api stuff
app.get('/static/authenticate', async function(req,res) {
    //run the api to auth spotify
    let test = await getAuth();
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + test.client_id + '&redirect_uri=' + encodeURIComponent(test.redirect_uri));
    // res.send(Object.keys(test.));
    // res.end();
    // console.log("RIGHT HERE HOMIE --------------------------------------------------------------------------");
    // console.log(Object.keys(test.request._redirectable._currentUrl));
    // res.send(test);
    // res.setHeader("Location", test.request._redirectable._currentUrl);
    // res.end();
});


// Serve static files
// http://expressjs.com/en/starter/static-files.html
app.use('/static', express.static('static'));
app.use('/node_modules', express.static('node_modules'));

// Default URL for website
app.use('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.use('*', function(req,res) {
    res.send("Error, page not found.");
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
