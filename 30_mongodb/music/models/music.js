var mongoose = require('mongoose');

// 스키마 정의
var MusicSchema = mongoose.Schema({
    title : {
        type : String, 
        trim : true,
        required : true
    },
    singer : {
        type : String, 
        trim : true,
        required : true
    },
    members : Array,
    year : Number,
    created : {
        type : Date,
        default : Date.now
    }
});

// 스키마에서 모델 클래스 생성 후 exports (musics)
module.exports = mongoose.model('music', MusicSchema);