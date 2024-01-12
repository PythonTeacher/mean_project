var express = require('express');
var Music = require('../models/music');

var router = express.Router();

// var data = fs.readFileSync('./musicData.json');
// var musicList = JSON.parse(data);

router.get('/', searchMusic);
router.get('/:id', searchMusicInfo);
router.post('/', addMusic);
router.put('/:id', updateMusic);
router.delete('/:id', deleteMusic);

// 노래 목록 조회 (/music)
function searchMusic(req, res) {    
    Music.find({}, function(err, result) {
        if( err ) {
            res.json({code: 500, message: "목록 조회 실패"});
        } else {
            res.json(result);
        }
    });
}

// 노래 상세 조회
function searchMusicInfo(req, res) {
    var id = req.params.id;
    
    Music.find({_id: id}, function(err, result) {
        if( err ) {
            var message = {
                code: 404,
                message: '노래 정보가 없습니다.'
            }
            res.json(message);
        } else {
            res.json(result);
        }
    });
}

// 노래 등록
function addMusic(req, res) {
    var music = new Music(req.body);

    music.save(function (err, result) {
        if( err ) {
            res.json({code: 500, message: "등록 실패"});
        } else {
            res.json(result);
        }
    });
}

// 노래 수정 (put : /music/1)
function updateMusic(req, res) {
    var id = req.params.id;
    
    Music.findByIdAndUpdate(id, req.body, function(err, result) {
        if( err ) {
            res.json({code: 500, message: "수정 실패"});
        } else {
            res.json(result);
        }
    });
}

// 노래 삭제를 위함 함수 (/music/1)
function deleteMusic(req, res) {
    var id = req.params.id;
    
    Music.remove({_id: id}, function(err, result) {
        if( err ) {
            res.json({code: 500, message: "삭제 실패"});
        } else {
            res.json(result);
        }
    });
}

module.exports = router;