// events : 이벤트를 처리하는 모듈
var EventEmitter = require('events');

var myEmitter = new EventEmitter();

// hello 이벤트 리스너
myEmitter.on('hello', function() {
    console.log('on : Hello!!');
});

// 처음 한번만 동작
myEmitter.once('hello', function() {
    console.log('once : Hello!!');
});

myEmitter.emit('hello');
myEmitter.emit('hello');
myEmitter.emit('hello');

process.on('exit', function() {
    console.log('Exit event..');
});