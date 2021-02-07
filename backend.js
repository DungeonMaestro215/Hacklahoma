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
let codes = [{ 
    code: 12345,
    songs: ['space jam', '22', 'William cannot authorize']
}];

function randomCode(length) {
    var result= '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

app.get('/getCode', function(req,res) {
    let code = randomCode(5);
    while (codes.reduce((acc, val) => acc || val.code == code), false) {
        code = randomCode(5);
    }

    codes.push({ 
        code: code,
        songs: []
    });

    // console.log('Current Codes: ' + codes);
    // console.log('New Code: ' + code);

    // res.json({ code: code });
    res.send({code});
});

app.get('/removeCode', function(req,res) {
    let idx = codes.find(element => element.code == code);
    if (idx != -1) {
        codes.splice(idx, 1);
    }
});

app.post('/addSong', function(req,res) {
    console.log('Homie __________________________________________________________________________');
    console.log(Object.keys(req));

    let code = req.body.code;
    let song = req.body.song;

    console.log('Code: ' + code);
    console.log('Song: ' + song);
    console.log('Codes: ' + codes);
    let playlist = codes.find(element => element.code == code);
    console.log(playlist);
    if (playlist != undefined) {
        // codes.find(element => element.code == code).songs.push(song);
        playlist.songs.unshift(song);
        // playlist.songs.push(song);
        // res.send('Song added to playlist');
        res.json(playlist);
    } else {
        res.send('Playlist does not exist');
    }

    
});

app.get('/getSongs', function(req,res) {
    // res.json({code: 1, songs: ['a', 'b']});

    console.log(Object.keys(req));
    console.log(Object.keys(req.body));

    let code = req.body.code;
    console.log("Code: " + code);

    let playlist = codes.find(element => element.code == code);
    console.log(playlist);
    if (playlist != undefined) {
        res.json(playlist);
    } else {
        // What do we do here??
        res.send('Bad stuff is happening.');
    }
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
