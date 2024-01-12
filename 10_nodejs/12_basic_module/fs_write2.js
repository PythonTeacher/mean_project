var fs = require('fs');

// 파일 저장 (파일이 없으면 생성, 있으면 overwrite)
fs.writeFile('hello.txt', 'Hello World!!', 'utf8', function(err) {
	if ( err ) {
	    console.error('파일 저장 실패 : ', err);
	    return;
	}
	console.log('파일 저장 성공');
	// 내용 추가 (파일 없으면 생성)
    fs.appendFile('hello.txt', '\n안녕하세요', 'utf8', (err) => {
        if (err) {
            console.error('파일 내용 추가 실패 : ', err);
            return;
        }
        console.log('파일 내용 추가 성공');
        // 파일명 변경
        fs.rename('hello.txt', 'hello_copy.txt', (err) => {
            if (err) {
                console.error('파일 rename 실패 : ', err);
                return;
            }
            console.log('파일 rename 성공');
            // 파일 삭제
            fs.unlink('hello_copy.txt', (err) => {
                if (err) {
                    console.error('파일 삭제 실패 : ', err);
                return;
                }
                console.log('파일 삭제 성공');
            });
        });
    });
});