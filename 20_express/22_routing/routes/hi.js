var express = require('express');
var router = express.Router();

router.get('/:who', sayHi);
router.get('/', sayHi);

function sayHi(req, res) {
    var who = req.params.who;
    if( who ) {
        res.send('Hi, ' + who);
    } else {
        res.send('Hi!!');
    }
}

module.exports = router;