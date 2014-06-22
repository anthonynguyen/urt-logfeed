var getName = function(person) {
	if (person.name != null) {
		return '<span class="client">[' + person.id.toString() + ']' + person.name + '</span>';
	} else {
		return '<span class="client">Client [' + person.id.toString() + ']</span>';
	}
}

var MapChangeFormatter = function(event) {
	var parts = {};
	parts.type = "Map";
	parts.label = "ev-game";
	parts.data = "Map changed to " + event.data.map;
	return parts;
}
var InitRoundFormatter = function(event) {
	var parts = {};
	parts.type = "Round Start";
	parts.label = "ev-game";
	parts.data = "Round started.";
	return parts;
}
var InitAuthFormatter = function(event) {
	var parts = {};
	parts.type = event.type;
	parts.label = "ev-game";
	parts.data = "Auth intialized.";
	return parts;
}
var ShutdownGameFormatter = function(event) {
	var parts = {};
	parts.type = "Shutdown";
	parts.label = "ev-game";
	parts.data = "Game stopped.";
	return parts;
}
var ClientDisconnectFormatter = function(event) {
	var parts = {};
	parts.type = "Disconnect";
	parts.label = "ev-client";
	parts.data = getName(event.subject) + " disconnected.";
	return parts;
}
var ClientRenameFormatter = function(event) {
	var parts = {};
	parts.type = "Rename";
	parts.label = "ev-client";
	parts.data = getName(event.subject) + " renamed to " + event.data.name;
	return parts;
}
var ClientTeamChangeFormatter = function(event) {
	var parts = {};
	parts.type = "Team";
	parts.label = "ev-client";
	parts.data = getName(event.subject) + " switched to the " + event.data.team + " team.";
	return parts;
}
var ClientSpawnFormatter = function(event) {
	var parts = {};
	parts.type = "Spawn";
	parts.label = "ev-client";
	parts.data = getName(event.subject) + " spawned.";
	return parts;
}
var ClientConnectFormatter = function(event) {
	var parts = {};
	parts.type = "Connect";
	parts.label = "ev-client";
	parts.data = getName(event.subject) + " connected.";
	return parts;
}
var sayFormatter = function(event) {
	var parts = {};
	parts.type = event.type;
	parts.label = "ev-chat";
	parts.data = getName(event.subject) + ": " + event.data.message;
	return parts;
}
var sayteamFormatter = function(event) {
	var parts = {};
	parts.type = event.type;
	parts.label = "ev-chat";
	parts.data = "(Team)" + getName(event.subject) + ": " + event.data.message;
	return parts;
}
var KillFormatter = function(event) {
	var parts = {};
	parts.type = event.type;
	if (event.data.type == 1) {
		parts.type = "teamkill";
	} else if (event.data.type == 2) {
		parts.type = "suicide";
	}
	parts.label = "ev-kill";
	parts.data = getName(event.subject) + " [" + event.data.weapon.name + "] " + getName(event.object);
	return parts;
}
var SurvivorWinnerFormatter = function(event) {
	var parts = {};
	parts.type = "Round End";
	parts.label = "ev-game";
	parts.data = event.data.team + " won a round.";
	return parts;
}
var FlagPickupFormatter = function(event) {
	var parts = {};
	parts.type = "Flag";
	parts.label = "ev-flag";
	parts.data = getName(event.subject) + " grabbed the " + event.data.flag + " flag.";
	return parts;
}
var FlagDropFormatter = function(event) {
	var parts = {};
	parts.type = "Flag";
	parts.label = "ev-flag";
	parts.data = getName(event.subject) + " dropped the " + event.data.flag + " flag.";
	return parts;
}
var FlagReturnFormatter = function(event) {
	var parts = {};
	parts.type = "Flag";
	parts.label = "ev-flag";
	parts.data = getName(event.subject) + " returned the " + event.data.flag + " flag.";
	return parts;
}
var FlagCaptureFormatter = function(event) {
	var parts = {};
	parts.type = "Flag";
	parts.label = "ev-flag";
	parts.data = getName(event.subject) + " captured the " + event.data.flag + " flag.";
	return parts;
}
var MapEndFormatter = function(event) {
	var parts = {};
	parts.type = event.type;
	parts.label = "ev-game";
	parts.data = "Map ended: " + event.data.reason;
	return parts;
}
var BombDropFormatter = function(event) {
	var parts = {};
	parts.type = "Bomb";
	parts.label = "ev-bomb";
	parts.data = getName(event.subject) + " dropped the bomb.";
	return parts;
}
var BombPickupFormatter = function(event) {
	var parts = {};
	parts.type = "Bomb";
	parts.label = "ev-bomb";
	parts.data = getName(event.subject) + " picked up the bomb.";
	return parts;
}
var BombPlantFormatter = function(event) {
	var parts = {};
	parts.type = "Bomb";
	parts.label = "ev-bomb";
	parts.data = getName(event.subject) + " planted the bomb.";
	return parts;
}
var BombDefuseFormatter = function(event) {
	var parts = {};
	parts.type = "Bomb";
	parts.label = "ev-bomb";
	parts.data = getName(event.subject) + " defused the bomb.";
	return parts;
}
var BombExplodeFormatter = function(event) {
	var parts = {};
	parts.type = "Bomb";
	parts.label = "ev-bomb";
	parts.data = "The bomb exploded.";
	return parts;
}
