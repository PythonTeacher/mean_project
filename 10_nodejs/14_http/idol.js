var http = require('http');
// var url = require('url');
var querystring = require('querystring');

var idolList = [];

http.createServer(function (req, res) {
    // get방식으로 목록 출력
    if(req.method.toLowerCase() == 'get') {
        showList(req, res);
    } 
    // post방식이면 idol 배열에 추가
    else {
        addData(req, res);
    }

}).listen(3000, function () {
    console.log('Server running');
});

function showList(req, res) {
    // 배열에 있는 idol 목록 출력하기
    res.writeHeader(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.write('<html>');
    res.write('<meta charset="UTF-8">');
    res.write('<body>');
    res.write('<h1>Idol List</h1>');
    res.write('<ul>');
    idolList.forEach(function (item) {
        res.write('<li>' + item.groupName + ' : ' + item.memberName + '</li>');
    })
    res.write('</ul>');

    // 입력 폼 작성
    res.write('<div>');
    res.write('<h2>Idol 입력</h2>');
    res.write('<form method="post" action=".">');
    res.write('<input type="text" name="groupName" placeholder="그룹명">');
    res.write('<input type="text" name="memberName" placeholder="멤버명">');
    res.write('<input type="submit" value="insert">');
    res.write('</form>');
    res.write('</div>');

    res.write('</body>');
    res.write('</html>');

    res.end();
}

function addData(req, res) {
    // idol 배열에 추가
    var body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
        var data = querystring.parse(body);
        console.log(data);

        // data에서 groupName, memberName을 추출하여 idolList 배열에 push
        var groupName = data.groupName;
        var memberName = data.memberName;

        // 에러 체크
        if(!groupName || !memberName) {
            res.statusCode = 500;
            res.end('입력값 오류');
            return;
        }

        idolList.push({'groupName': groupName, 'memberName': memberName});

        // res.end('등록 성공');
        // PRG 패턴 추가 (Post-Redirect-Get)
        res.writeHead(302, {'Location': '.'});
        res.end();
    });
}

