var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/meandb');

var db = mongoose.connection;
db.once('open', function() {
    console.log('Database connected!!');
});

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 라우팅 핸들러 모듈 분리
var music = require('./routes/music');
app.use('/music', music);