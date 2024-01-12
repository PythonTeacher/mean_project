// url : URL 처리를 위한 모듈
var url = require('url');

// urlencode : url 인코딩/디코딩을 위한 확장 모듈
// npm install urlencode
var urlencode = require('urlencode');

var urlPath = 'https://search.naver.com/search.naver?where=nexearch&query=node.js';

// parse : String -> Object 변환
var parsed = url.parse(urlPath, true);
console.log(parsed);

console.log(parsed.host);
// node.js 찍기
console.log(parsed.query.query);

// URL 만들기
var urldata = {
    protocol : 'http',
    host : 'dimigo.in',
    pathname : 'dimibap/today',
    search : 'main=' + urlencode('제육덮밥') + '&soup=' + urlencode('떡국')
}

// format : Object -> String 변환
var newUrl = url.format(urldata);

console.log(newUrl);

console.log(urlencode.decode('%EC%A0%9C%EC%9C%A1%EB%8D%AE%EB%B0%A5'));