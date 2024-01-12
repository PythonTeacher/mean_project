var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    console.log('Method:', req.method);
    console.log('URL:', req.url);

    // http://127.0.0.1:3000/idol?group=bigbang&member=GD
    var parsed = url.parse(req.url, true);
    console.log(parsed);

    res.end();
}).listen(3000, function () {
    console.log('Server running');
});