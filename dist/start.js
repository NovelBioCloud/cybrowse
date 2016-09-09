var express = require('express');
var app = express();
//app.use(require('connect-livereload')());
app.get('/', function (req, res) {
	res.redirect('/cybrowse');
});
app.use('/cybrowse', express.static('cybrowse'));
app.use('/redux', express.static('redux'));
app.use('/react-redux', express.static('react-redux'));
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('example app listening at %s %s', host, port);
});
