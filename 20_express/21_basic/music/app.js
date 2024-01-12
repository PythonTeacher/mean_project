var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var data = fs.readFileSync('./musicData.json');
var musicList = JSON.parse(data);

// 노래 목록 조회
app.get('/music', function(req, res) {
    searchMusic(req, res);
});

// 노래 상세 조회
app.get('/music/:id', function(req, res) {
    searchMusicInfo(req, res);
});

// 노래 추가
app.post('/music', function(req, res) {
    addMusic(req, res);
});

// 노래 수정
app.put('/music/:id', function(req, res) {
    updateMusic(req, res);
});

// 노래 삭제
app.delete('/music/:id', function(req, res) {
    deleteMusic(req, res);
});

// 노래 목록 조회 (/music)
function searchMusic(req, res) {    
    var result = {
        count: musicList.length,
        data: musicList
    };

    // res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    // res.end(JSON.stringify(result));
    res.json(result);
}

// 노래 상세 조회
function searchMusicInfo(req, res) {
    var id = req.params.id;
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
        res.json(music);
    } else {
        // res.writeHead(404, {'Content-Type': 'application/json;charset=utf-8'});
        var message = {
            code: 404,
            message: '노래 정보가 없습니다.'
        }
        // res.end(JSON.stringify(message));
        res.json(message);
    }
}

// 노래 등록
function addMusic(req, res) {
    var item = {
        id: musicList.length,
        title: req.body.title,
        singer: req.body.singer,
        members: req.body.members,
        year: req.body.year
    };
    musicList.push(item);
    res.json({result: 'success'});
}

// 노래 수정 (put : /music/1)
function updateMusic(req, res) {
    var id = req.params.id;
    var isExist = false;

    for (var i = 0; i < musicList.length; i++) {
        var item = musicList[i];
        if (id == item.id) {
            item.title = req.body.title;
            item.singer = req.body.singer;
            item.members = req.body.members;
            item.year = req.body.year
            isExist = true;
            break;
        }
    }

    if(!isExist) {
        var message = {
            error : {
                code : 404,
                message : '노래 정보가 없습니다.'                    
            }
        }
        res.json(message);
    } else {
        res.json({result:'success'});     
    }
}

// 노래 삭제를 위함 함수 (/music/1)
function deleteMusic(req, res) {
    var id = req.params.id;
    var isExist = false;

    for(var i = 0; i < musicList.length; i++) {
        if(id == musicList[i].id) {
            musicList.splice(i, 1);
            isExist = true;
            break;
        }
    }

    if(!isExist) {
        // res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
        var message = {
            error : {
                code : 404,
                message : '노래 정보가 없습니다.'                    
            }
        }
        res.json(message);
    } else {
        res.json({result:'success'});     
    }
}