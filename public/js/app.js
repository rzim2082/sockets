var socket = io();


socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});



socket.on('message', function(message){
	console.log('New message:');
	console.log(message.text);
	//var messageToHTML = '<h1>' + message.text + '</h1>';
	//document.getElementByClass('received-message').innerHTML += messageToHTML;
	

	jQuery('.received-message').append('<p>' + message.text + '</p><p>' + message.timestamp + '</p>');
});




// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault(); //when you dont want to refresh the entire page

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
		
	});
	
	this.reset();
});