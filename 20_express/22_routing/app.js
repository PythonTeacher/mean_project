var express = require('express');
// var bodyParser = require('body-parser');
var app = express();

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// 라우팅 핸들러 모듈 분리
var hello = require('./routes/hello');
app.use('/hello', hello);

var hi = require('./routes/hi');
app.use('/hi', hi);

app.get('/', function(req, res, next) {
    var error = new Error('공사중');
    error.code = 500;
    next(error);
});

// 에러 처리 미들웨어
app.use(errorHandler);

// 에러 처리 미들웨어 함수 : 반드시 제일 끝에 작성해야 함
function errorHandler(err, req, res, next) {
    // 개발 시
    // res.send(err.stack);

    // 운영 시 
    res.send('<h3>' + err.message + '</h3>');
}