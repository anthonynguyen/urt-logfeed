eventParsers = {
	InitGameParser: function(data) {
		console.log("InitGame parsed.");
		return data;
	},
	InitAuthParser: function(data) {
		console.log("InitAuth parsed.");
		return data;
	},
	ShutdownGameParser: function(data) {
		console.log("ShutdownGame parsed.");
		return data;
	},
	ClientConnectParser: function(data) {
		console.log("ClientConnect parsed.");
		return data;
	},
	ClientDisconnectParser: function(data) {
		console.log("ClientDisconnect parsed.");
		return data;
	},
	ClientUserinfoParser: function(data) {
		console.log("ClientUserinfo parsed.");
		return data;
	},
	ClientUserinfoChangedParser: function(data) {
		console.log("ClientUserinfoChanged parsed.");
		return data;
	},
	ClientSpawnParser: function(data) {
		console.log("ClientSpawn parsed.");
		return data;
	},
	ClientBeginParser: function(data) {
		console.log("ClientBegin parsed.");
		return data;
	},
	sayparser: function(data) {
		console.log("say parsed.");
		return data;
	},
	sayteamParser: function(data) {
		console.log("sayteam parsed.");
		return data;
	},
	KillParser: function(data) {
		console.log("Kill parsed.");
		return data;
	}
}
