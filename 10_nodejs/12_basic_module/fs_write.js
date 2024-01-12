var fs = require('fs');

// 파일 저장
fs.writeFile('hello.txt', 'Hello, 안녕', 'utf8', function (err) {
    if(err) {
        console.error('파일 저장 실패 : ', err);
        return;
    }
    console.log('파일 저장 성공');
});

// 내용 추가
fs.appendFile('hello.txt', '\nHello, 안녕', 'utf8', function (err) {
    if(err) {
        console.error('내용 추가 실패 : ', err);
        return;
    }
    console.log('내용 추가 성공');
});

// 파일명 변경
fs.rename('hello.txt', 'hello_copy.txt', function (err) {
    if(err) {
        console.error('파일명 변경 실패 : ', err);
        return;
    }
    console.log('파일명 변경 성공');
});

// 파일 삭제
fs.unlink('hello_copy.txt', function (err) {
    if(err) {
        console.error('파일 삭제 실패 : ', err);
        return;
    }
    console.log('파일 삭제 성공');
});