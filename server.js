var express = require('express');
var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();




app.use(express.static(__dirname + '/public'));


var clientInfo = {};


io.on('connection', function(socket){
	console.log('User connected via socket.io!');

	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(message){
		message.timestamp = moment().valueOf();
		console.log('Message received: ' + message.text + ' ' + message.timestamp);

		//socket.broadcast.emit('message', message); //this will emit to everyone but you
		
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	
	socket.emit('message', {
		name: 'SERVER',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});




});


http.listen(PORT, function(){
	console.log('Server started!')
});