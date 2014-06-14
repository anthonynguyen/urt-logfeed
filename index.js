var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var fs = require('fs');
var Tail = require('tail').Tail;

require('./config');
require('./events');

tail = new Tail(config.logPath);

server.listen(3000);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html', function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

var gameVars = {};
var clients = {};

function cidToName(cid) {
	if (clients[cid] != null) {
		return clients[cid].name;
	}
	return cid;
}	

function parseLine(line) {
	var eventRE = /^\s+\d+?:\d+? (.+?): ?(.*)$/;
	var match = eventRE.exec(line);
	if (!match) {
		return null;
	}
	var eventType = match[1];
	var rawEventData = match[2];
	if (eventType + "Parser" in eventParsers) {
		event = eventParsers[eventType + "Parser"](rawEventData);
		if (event.type == "InitGame") {
			gameVars = event.data;
		} else if (event.type == "ClientConnect") {
			clients[event.subject] = null;
		} else if (event.type == "ClientUserinfo") {
			clients[event.subject] = event.data;
		} else if (event.type == "ClientDisconnect") {
			delete clients[event.subject];
		}
		return event;
	} else {
		return null;
	}
}

tail.on("line", function(line) {
	var event = parseLine(line);
	if (!!event) {
		io.emit("event", event);
		console.log("Event found: " + event.type);
	}
});
