// http : http를 처리를 위한 모듈
var http = require('http');

// http.Server 객체 생성
http.createServer(function (req, res) {
    // 1. 응답 메세지 헤더부 작성
    // writeHead(statusCode[, statusMessage, headers])
    // res.writeHead(200, 'OKOK', {'Content-Type': 'text/html'});
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.statusMessage = 'OKOK';

    // 2. 응답 메시지 바디부 작성
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>안녕!</h1>');

    // 3. end() : 응답 메시지 작성 끝
    res.end('끝');
}).listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// listen 메소드 호출
// server.listen(3000);

// console.log('Server running at http://127.0.0.1:3000');