function Event(type) {
	this.type = type;
	this.subject = -1;
	this.object = -1;
	this.data = {};
}


eventParsers = {
	InitGameParser: function(rawdata) {
		var event = new Event("InitGame");
		
		var data = {};
		var parts = rawdata.split("\\");
		parts.splice(0, 1); // The data section of an InitGame line starts with a \
		for (var i = 0; i < parts.length / 2; i += 2) {
			data[parts[i]] = parts[i + 1];
		}
	
		event.data = data;
		return event;
	},
	InitAuthParser: function(rawdata) {
		var event = new Event("InitAuth");		
		
		var data = {};
		var parts = rawdata.split("\\");
		parts.splice(0, 1); // Same reason as above
		for (var i = 0; i < parts.length / 2; i += 2) {
			data[parts[i]] = parts[i + 1];
		}

		event.data = data;
		return event;
	},
	ShutdownGameParser: function(rawdata) {
		var event = new Event("ShutdownGame");	
		return event;
	},
	ClientConnectParser: function(rawdata) {
		var event = new Event("ClientConnect");
		event.subject = parseInt(rawdata);
		return event;
	},
	ClientDisconnectParser: function(rawdata) {
		var event = new Event("ClientDisconnect");
		event.subject = parseInt(rawdata);
		return event;
	},
	ClientUserinfoParser: function(rawdata) {
		var event = new Event("ClientUserinfo");
	
		var data = {};
		parts = rawdata.split(" ");

		event.subject = parseInt(parts[0]); // CID for player whose info changed

		parts = parts[1].split("\\");
		parts.splice(0, 1); // Starts with a \
		for (var i = 0; i < parts.length; i += 2) {
			data[parts[i]] = parts[i + 1];
		}
		
		event.data = data;
		return event;
	},
	ClientSpawnParser: function(rawdata) {
		var event = new Event("ClientSpawn");
		event.subject = parseInt(rawdata);
		return event;
	},
	ClientBeginParser: function(rawdata) {
		var event = new Event("ClientBegin");
		event.subject = parseInt(rawdata);
		return event;
	},
	sayparser: function(rawdata) {
		var event = new Event("say");
		
		var data = {};
		return event;
	},
	sayteamParser: function(rawdata) {
		var event = new Event("sayteam");
		
		var data = {};
		return event;
	},
	KillParser: function(rawdata) {
		var event = new Event("Kill");
		
		var data = {};
		return event;
	},
	SurvivorWinnerParser: function(rawdata) {
		var event = new Event("SurvivorWinner");
		
		var data = {};
		return event;
	}
}
