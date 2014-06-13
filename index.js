var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var fs = require('fs');
var config = require('./config');
var Tail = require('tail').Tail;

tail = new Tail(logPath);

console.log(config);

server.listen(3000);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

/*
setInterval(function() {
	io.emit('chat-message', 'Hello!');
}, 3000);
*/

tail.on("line", function(line) {
	io.emit("message", line);
});
