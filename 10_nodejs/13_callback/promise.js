// Promise : 체인방식으로 동작
// Promise 상태 : fulfulled, rejected
var fs = require('fs');

function task1(fulfill, reject) {
    fs.readFile('hello.txt', 'utf-8', function(err, reulst) {
        if( err ) {
            reject(err);
        } else {
            fulfill('task1 결과');
        }
    });
}

// promise객체.then(완료시 수행할 함수, 에러시 수행할 함수)
new Promise(task1).then(function (result) {
    console.log('** fulfilled :', result);
}, function(err) {
    console.log('** rejected :', err.message);
});

// 두번째 방법
function task2() {
    return new Promise(function (fulfill, reject) {
        fs.readFile('hello.txt', 'utf-8', function(err, reulst) {
            if( err ) {
                reject(err);
            } else {
                fulfill('task2 결과');
            }
        });
    })
}

task2().then(function (result) {
    console.log('** fulfilled :', result);
}, function(err) {
    console.log('** rejected :', err.message);
});

// Promise chaining
task2()
    .then(function (result) {
        console.log('** fulfilled1 :', result);
        return "결과1";
    })
    .then(function (result) {
        console.log('** fulfilled2 :', result);
        if(1) throw Error("test error");
        return "결과2";
    })
    .then(function (result) {
        console.log('** fulfilled3 :', result);
        return "결과3";
    })
    .catch(function (err) {
        console.error('Error:', err);
    });








