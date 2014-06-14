function Event(type) {
	this.type = type;
	this.subject = {
		id: -1,
		name: null
	};
	this.object = {
		id: -1,
		name: null
	};
	this.data = {};
}


eventParsers = {
	InitGameParser: function(rawdata) {
		var event = new Event("InitGame");
		
		var parts = rawdata.split("\\");
		parts.splice(0, 1); // The data section of an InitGame line starts with a \
		for (var i = 0; i < parts.length / 2; i += 2) {
			event.data[parts[i]] = parts[i + 1];
		}
	
		return event;
	},
	InitRoundParser: function(rawdata) {
		var event = new Event("InitRound");

		var parts = rawdata.split("\\");
		parts.splice(0, 1);
		for (var i = 0; i < parts.length / 2; i += 2) {
			event.data[parts[i]] = parts[i + 1];
		}

		return event;
	},
	InitAuthParser: function(rawdata) {
		var event = new Event("InitAuth");		
		
		var parts = rawdata.split("\\");
		parts.splice(0, 1); // Same reason as above
		for (var i = 0; i < parts.length / 2; i += 2) {
			event.data[parts[i]] = parts[i + 1];
		}

		return event;
	},
	ShutdownGameParser: function(rawdata) {
		var event = new Event("ShutdownGame");	
		return event;
	},
	ClientConnectParser: function(rawdata) {
		var event = new Event("ClientConnect");
		event.subject.id = parseInt(rawdata);
		return event;
	},
	ClientDisconnectParser: function(rawdata) {
		var event = new Event("ClientDisconnect");
		event.subject.id = parseInt(rawdata);
		return event;
	},
	ClientUserinfoParser: function(rawdata) {
		var event = new Event("ClientUserinfo");
	
		parts = rawdata.split(" ");

		event.subject.id = parseInt(parts[0]); // CID for player whose info changed

		parts = parts[1].split("\\");
		parts.splice(0, 1); // Starts with a \
		for (var i = 0; i < parts.length; i += 2) {
			event.data[parts[i]] = parts[i + 1];
		}
		
		return event;
	},
	ClientSpawnParser: function(rawdata) {
		var event = new Event("ClientSpawn");
		event.subject.id = parseInt(rawdata);
		return event;
	},
	ClientBeginParser: function(rawdata) {
		var event = new Event("ClientBegin");
		event.subject.id = parseInt(rawdata);
		return event;
	},
	sayParser: function(rawdata) {
		var event = new Event("say");
		
		var parts = rawdata.split(" ");
		event.subject.id = parseInt(parts[0]);
		event.subject.name = parts[1].slice(0, -1);

		parts.splice(0, 2);
		event.data.message = parts.join(" ");
		return event;
	},
	sayteamParser: function(rawdata) {
		var event = new Event("sayteam");
		
		var data = {};
		return event;
	},
	KillParser: function(rawdata) {
		var event = new Event("Kill");
		
		var parts = rawdata.split(": ");
		var numParts = parts[0].split(" ");
		var textParts = parts[1].split(" ");
		
		event.subject.id = parseInt(numParts[0]);
		event.object.id = parseInt(numParts[1]);
		
		event.subject.name = textParts[0];
		event.object.name = textParts[2];

		var weapParts = textParts[4].split("_");
		if (weapParts[0] == "UT") {
			weapParts.splice(0, 2);
		} else {
			weapParts.splice(0, 1);
		}

		event.data = {weapon: numParts[2], weapName: weapParts.join(" ")};
		
		return event;
	},
	SurvivorWinnerParser: function(rawdata) {
		var event = new Event("SurvivorWinner");
		event.data.team = rawdata;
		return event;
	}
}
