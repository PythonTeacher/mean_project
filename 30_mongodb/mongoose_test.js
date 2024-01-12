var mongoose = require('mongoose');

// 1. 데이터베이스 연결
mongoose.connect('mongodb://127.0.0.1:27017/meandb');

var db = mongoose.connection;
db.once('open', function() {
    console.log('Database connected!!');
});

// 2. 스키마 정의
var fruitSchema = mongoose.Schema({
    name: String,
    price: Number
});

// 3. 스키마에서 모델 클래스 생성
// fruit -> fruits, person -> people
var Fruit = mongoose.model('fruit', fruitSchema);

// 4. 모델 클래스에서 문서 객체 생성
var apple = new Fruit({ name: "apple", price: 1000 });

// 5. CRUD처리 (등록)
apple.save(function (err, result) {
    if( err ) {
        console.error(err);
        return;
    }
    console.log('apple saved : ', result);
});

// Promise
var orange = new Fruit({ name: "orange", price: 3000 });
orange.save().then(function(result) {
    console.log('orange saved : ', result);

    // 조회
    Fruit.find({}, function(err, result) {
        if( err ) {
            console.error(err);
            return;
        }
        console.log('find : ', result);
    });
}, function rejected(err) {
    console.error(err);
});