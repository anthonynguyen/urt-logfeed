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

var gameVars = null;
var clients = {};

function cidToName(cid) {
	if (cid in clients) {
		return clients[cid].name;
	}
	return null;
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
		if (event.type == "InitGame" || event.type == "InitRound") {
			if (gameVars == null) {
				gameVars = event.data;
			} else {
				mergeObj(gameVars, event.data);
			}
		} else if (event.type == "ClientConnect") {
			clients[event.subject.id] = {};
		} else if (event.type == "ClientUserinfo") {
			if (clients[event.subject.id] == undefined) {
				clients[event.subject.id] = event.data;
			} else {
				mergeObj(clients[event.subject.id], event.data);
			}
		} else if (event.type == "ClientDisconnect") {
			delete clients[event.subject];
		} else if (event.type == "ClientTeamChange") {
			var teamNames = {1: "Red", 2: "Blue", 3: "Spec"};
			mergeObj(clients[event.subject.id], {team: teamNames[event.data.team]});
		} else if (event.type == "Kill" && event.data.type == 0) {
			if (event.subject.id in clients &&
				event.object.id in clients &&
				"team" in clients[event.subject.id] &&
				"team" in clients[event.object.id]) {
				if (clients[event.subject.id].team == clients[event.object.id].team) {
					event.data.type = 1;
				}
			}
		}

		if (event.subject.name != null) {
			mergeObj(clients[event.subject.id], {name: event.subject.name});
		}

		if (event.object.name != null) {
			mergeObj(clients[event.object.id], {name: event.object.name});
		}

		if (event.subject.id > -1 && event.subject.name == null) {
			event.subject.name = cidToName(event.subject.id);
		}

		if (event.object.id > -1 && event.object.name == null) {
			event.object.name = cidToName(event.object.id);
		}
		
		return event;
	} else {
		return null;
	}
}

tail.on("line", function(line) {
	var event = parseLine(line);
	if (!!event) {
		if (config.exposeEvents[event.type]) {
			io.emit("event", event);
			console.log("Event sent: " + event.type);
		}
	}
});
