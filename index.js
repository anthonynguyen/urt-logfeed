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

clients = {};

function parseLine(line) {
	var eventRE = /^\s+\d+?:\d+? (.+?): ?(.*)$/;
	console.log(line);
	var match = eventRE.exec(line);
	console.log(match);
	if (!match) {
		return null;
	}
	var eventType = match[1];
	var eventData = match[2];
	var event = {};
	event.type = eventType;
	event.data = eventData;
	return event;
}

tail.on("line", function(line) {
	var event = parseLine(line);
	if (!!event) {
		io.emit("event", event);
		console.log("Event found: " + event.type + ", " + event.data);
	} else {
		console.log("Event not found on line:\n");
		console.log(line);
	}
});
