// npm install express
var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// http://127.0.0.1:3000/
app.get('/', function(req, res) {
    res.send('<h1>Hello, World</h1>');
});

// http://127.0.0.1:3000/music
app.get('/music', function(req, res) {
    res.send('<h1>Hello, Music</h1>');
});