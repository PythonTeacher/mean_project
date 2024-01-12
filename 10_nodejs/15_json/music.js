var http = require('http');
var fs = require('fs');

var data = fs.readFileSync('./musicData.json');
var musicList = JSON.parse(data);   // 문자열 -> 객체
console.log(musicList);

// RESTful 서비스 = HTTP URI + HTTP Method
// 예) GET /members/delete/1 -> DELETE /members/1
// HTTP Method : GET(select), POST(create), 
// PUT(update), DELETE(delete)

var server = http.createServer(function (req, res) {
    var method = req.method.toLowerCase();
    switch(method) {
        case 'get':
            // 노래 목록 조회 : /music 
            // 노래 상세정보 조회 : /music/1, /music/2
            searchMusic(req, res);
            return;
        case 'post':
            // 노래 추가 : /music
            addMusic(req, res);
            return;
        case 'put':
            // 노래 수정 : /music/1, /music/2
            updateMusic(req, res);
            return;
        case 'delete':
            // 노래 삭제 : /music/1, /music/2
            deleteMusic(req, res);
            return;
        default:
            res.writeHead(404, {'Content-Type': 'application/json'});
            var message = {
                code: 404,
                message: '잘못된 요청입니다.'
            }
            res.end(JSON.stringify(message));   // 객체 -> 문자열
    }

}).listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

// 노래 목록 조회 (/music), 상세조회 (/music/1) 함수
function searchMusic(req, res) {
    var url = req.url;
    if(url == '/music' || url == '/') {
        var result = {
            count: musicList.length,
            data: musicList
        };

        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
    } else {
        // id값 추출 : /music/1
        var id = url.split('/')[2];    // [ , music, 1]
        var music = null;

        // 노래 목록에서 id로 검색하여 해당 노래정보 리턴하기
        for(var i=0; i<musicList.length; i++) {
            var tmp = musicList[i];
            if(tmp.id == id) {
                music = tmp;
                break;
            }
        }

        if(music) {
            res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(music));
        } else {
            res.writeHead(404, {'Content-Type': 'application/json;charset=utf-8'});
            var message = {
                code: 404,
                message: '노래 정보가 없습니다.'
            }
            res.end(JSON.stringify(message));
        }
    }
}

// 노래 등록
function addMusic(req, res) {
    var buffer = '';
    req.on('data', function(chunk) {
        buffer += chunk;
    });

    req.on('end', function() {
        var parsed = JSON.parse(buffer);
        console.log(parsed);

        var item = {
            id: musicList.length,
            title: parsed.title,
            singer: parsed.singer,
            members: parsed.members,
            year: parsed.year
        };
        musicList.push(item);

        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify({result: 'success'}));
    });
}

// 노래 수정 (put : /music/1)
function updateMusic(req, res) {
    var url = req.url;
    var id = url.split('/')[2];
    var isExist = false;

    var buffer = '';
    req.on('data', function (chunk) {
        buffer += chunk;
    });

    req.on('end', function () {
        var parsed = JSON.parse(buffer);
        console.log(parsed);
        
        for (var i = 0; i < musicList.length; i++) {
            var item = musicList[i];
            if (id == item.id) {
                item.title = parsed.title;
                item.singer = parsed.singer;
                item.members = parsed.members;
                item.year = parsed.year
                isExist = true;
                break;
            }
        }

        if(!isExist) {
            res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
            var message = {
                error : {
                    code : 404,
                    message : '노래 정보가 없습니다.'                    
                }
            }
            res.end(JSON.stringify(message));
        } else {
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({result:'success'}));     
        }    
    });
}

// 노래 삭제를 위함 함수 (/music/1)
function deleteMusic(req, res) {
    var url = req.url;
    var id = url.split('/')[2];
    var isExist = false;

    var buffer = '';
    req.on('data', function (chunk) {mus
        buffer += chunk;
    });

    req.on('end', function () {
        for(var i = 0; i < musicList.length; i++) {
            if(id == musicList[i].id) {
                musicList.splice(i, 1);
                isExist = true;
                break;
            }
        }

        if(!isExist) {
            res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
            var message = {
                error : {
                    code : 404,
                    message : '노래 정보가 없습니다.'                    
                }
            }
            res.end(JSON.stringify(message));
        } else {
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({result:'success'}));     
        }    
    });
}