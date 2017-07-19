var express = require('express');
var fs = require('fs')
// var config = require('./config/index.js');

var port = process.env.PORT || 18000;

var app = express();

app.use(express.static('./dist'));

app.get("/",function(req,res){
	res.render('index.html',{})
})

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});