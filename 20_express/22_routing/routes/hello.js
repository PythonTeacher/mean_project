var express = require('express');
var router = express.Router();

router.get('/:who', sayHello);
router.get('/', sayHello);

function sayHello(req, res) {
    var who = req.params.who;
    if( who ) {
        res.send('Hello, ' + who);
    } else {
        res.send('Hello!!');
    }
}

module.exports = router;