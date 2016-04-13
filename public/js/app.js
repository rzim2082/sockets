var socket = io();
var name = getQueryVariable('name');
var room = getQueryVariable('room');


jQuery('.room-name').text(room);

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
	/*socket.emit('message', {
		text: name + ' joined room: ' + room
	});*/
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
	
});



socket.on('message', function(message){
	console.log('New message:');
	console.log(message.text);
	var $message = jQuery('.received-message');
	var timestampMoment = moment.utc(message.timestamp);

	$message.append('<p>' + timestampMoment.local().format('h:mm a') + ' ' + message.name + ':');
	$message.append('<strong>' + message.text + '</strong></p>');
	//jQuery('.received-message').append('<p>' + timestampMoment.local().format('h:mm a') + ' Message from ' + message.name + ': <strong>' + message.text + '</strong></p>');
});




// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault(); //when you dont want to refresh the entire page

	var $message = $form.find('input[name=message]');
	

	socket.emit('message', {
		name: name,
		text: $message.val()
		
		
	});
	
	this.reset();
});