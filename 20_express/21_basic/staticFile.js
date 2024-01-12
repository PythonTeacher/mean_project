var express = require('express');
var app = express();
app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// 정적 파일 위치 설정
// http://127.0.0.1:3000/hello.html -> public/hello.html
// app.use(express.static('public'));
// app.use(express.static('images'));

// 가상 경로 설정
// http://127.0.0.1:3000/static/hello.html
// http://127.0.0.1:3000/static/dog.jpg
app.use('/static', express.static('public'));
app.use('/static', express.static('images'));