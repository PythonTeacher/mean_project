var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 라우팅 핸들러 모듈 분리
var music = require('./routes/music');
app.use('/music', music);