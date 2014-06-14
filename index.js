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
	if (clients[cid] != null && !(clients[cid] == undefined)) {
		return clients[cid].name;
	}
	return cid;
}

function mergeObj(obj1, obj2) { // Merges obj2's attributes onto obj1
	if (obj1 == undefined) {
		return;
	}
	for (var attr in obj2) {
		obj1[attr] = obj2[attr];
	}
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
			clients[event.subject] = {};
		} else if (event.type == "ClientUserinfo") {
			if (clients[event.subject] == undefined) {
				clients[event.subject] = event.data;
			} else {
				mergeObj(clients[event.subject], event.data);
			}
		} else if (event.type == "ClientDisconnect") {
			delete clients[event.subject];
		}
		
		if (event.subjectName != null) {
			mergeObj(clients[event.subject], {name: event.subjectName});
		}

		if (event.objectName != null) {
			mergeObj(clients[event.object], {name: event.objectName});
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
