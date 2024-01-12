// async : 비동기 동작들의 흐름을 제어하는 모듈]
var fs = require('fs');
var async = require('async');

// 파일 저장
function writeFile(callback) {
    fs.writeFile('hello.txt', 'Hello, 안녕', 'utf8', function (err) {
        if(err) {
            console.error('파일 저장 실패 : ', err);
            callback(err, 'save 에러');
            return;
        }
        console.log('파일 저장 성공');
        callback(null, 'save 결과');
    });
}

// 내용 추가
function appendFile(callback) {
    fs.appendFile('hello.txt', '\nHello, 안녕', 'utf8', function (err) {
        if(err) {
            console.error('내용 추가 실패 : ', err);
            callback(err, 'append 에러');
            return;
        }
        console.log('내용 추가 성공');
        callback(null, 'append 결과');
    });
}

// 파일명 변경
function renameFile(callback) {
    fs.rename('hello.txt', 'hello_copy.txt', function (err) {
        if(err) {
            console.error('파일명 변경 실패 : ', err);
            callback(err, 'rename 에러');
            return;
        }
        console.log('파일명 변경 성공');
        callback(null, 'rename 결과');
    });
}

// 파일 삭제
function deleteFile(callback) {
    fs.unlink('hello_copy.txt', function (err) {
        if(err) {
            console.error('파일 삭제 실패 : ', err);
            callback(err, 'delete 에러');
            return;
        }
        console.log('파일 삭제 성공');
        callback(null, 'delete 결과');
    });
}

// 형식 : async.series([순서제어함수1, 2, 3], function(err, result) { })
async.series([writeFile, appendFile, renameFile, deleteFile], 
                function(err, results) {
    if( err ) {
        console.error('Error : ', err);
        return;
    }
    console.log('All tasks ended : ', results);
});