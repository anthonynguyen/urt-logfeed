
eventParsers = {
	InitGameParser: function(rawdata) {
		var data = {};
		var parts = rawdata.split("\\");
		parts.splice(0, 1); // The data section of an InitGame line starts with a \
		for (var i = 0; i < parts.length / 2; i += 2) {
			data[parts[i]] = parts[i + 1];
		}
		return data;
	},
	InitAuthParser: function(rawdata) {
		var data = {};
		var parts = rawdata.split("\\");
		parts.splice(0, 1); // Same reason as above
		for (var i = 0; i < parts.length / 2; i += 2) {
			data[parts[i]] = parts[i + 1];
		}
		return data;
	},
	ShutdownGameParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	ClientConnectParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	ClientDisconnectParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	ClientUserinfoParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	ClientUserinfoChangedParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	ClientSpawnParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	ClientBeginParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	sayparser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	sayteamParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	KillParser: function(rawdata) {
		var data = {};
		return rawdata;
	},
	SurvivorWinnerParser: function(rawdata) {
		var data = {};
		return rawdata;
	}
}
