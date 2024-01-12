var express = require('express');
// npm install body-parser
var bodyParser = require('body-parser');

var app = express();
app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// 바디 파서 : URLEncoded 방식으로 전달되는 메시지의 바디부를 분석
// true: qs library, false: querystring library
app.use(bodyParser.urlencoded({extended: false}));

// 바디 메시지가 JSON인 요청을 분석하는 바디파서 설정
app.use(bodyParser.json());

// querystring 방식 처리
// http://127.0.01:3000/?title=좋은날&singer=아이유
app.get('/', function(req, res) {
    console.log('req.query:', req.query);
    var title = req.query.title;
    var singer = req.query.singer;

    res.send('title:' + title + ', singer:' + singer);
});

// RESTFul 서비스 방식 처리 (동적파라미터 처리)
// http://127.0.0.1:3000/좋은날/아이유
app.get('/:title/:singer', function(req, res) {
    console.log('req.params:', req.params);
    var title = req.params.title;
    var singer = req.params.singer;
    
    res.send('2) title:' + title + ', singer:' + singer);
});

// post 방식 처리
// json, x-www-form-urlencoded
// http://127.0.0.1:3000
app.post('/', function (req, res) {
    console.log('req.body:', req.body);
    var title = req.body.title;
    var singer = req.body.singer;

    res.send('3) title:' + title + ', singer:' + singer);
});