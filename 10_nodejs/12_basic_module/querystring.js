// querystring : query string을 다루는 모듈

// HTTP 통신 시 두가지 방식
// 1. GET 방식 : URL로 데이터 전달 -> url 모듈만으로도 가능
// 2. POST 방식 : HTTP 메시지 바디로 데이터 전달 -> querystring 모듈 필요

var querystring = require('querystring');

var str = 'where=nexearch&query=node.js';

// parse : string -> object
var parsed = querystring.parse(str);

console.log(parsed);
console.log(parsed.query);

// 배열
var group = 'group=bigbang&member=GD&member=SUN&member=TOP';

var parsed2 = querystring.parse(group);
console.log(parsed2);

// stringify : object -> string
console.log("test" + querystring.stringify(parsed2));