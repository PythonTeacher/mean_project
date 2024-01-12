var async = require('async');

function task1(callback) {
    console.log('task1 start');
    setTimeout(function() {
        callback(null, 'task1 결과');
    }, 1000);
}

function task2(callback) {
    console.log('task2 start');
    setTimeout(function() {
        callback(null, 'task2 결과');
    }, 1000);
}

function task3(callback) {
    console.log('task3 start');
    setTimeout(function() {
        callback(null, 'task3 결과');
    }, 1000);
}

// 시간 측정
console.time('TIMER');

// Task1, Task2, Task3 동시 실행
async.parallel([task1, task2, task3], function(err, results) {
    if( err ) {
        console.error('Error:', err);
        return;
    }
    console.log('All tasks ended : ', results);

    console.timeEnd('TIMER');
});
    