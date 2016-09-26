var express = require('express');
var app = express();
//app.use(require('connect-livereload')());

app.use('/cybrowse/**', express.static('cybrowse'));
app.use('/lib/**', express.static('lib'));
app.use('/redux', express.static('redux'));
app.use('/react-redux', express.static('react-redux'));
app.get('/', function (req, res) {
	res.redirect('/cybrowse');
});
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('example app listening at %s %s', host, port);
});
