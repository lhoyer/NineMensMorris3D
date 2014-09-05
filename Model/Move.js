function Move (raw) {
	switch(raw.type) {
		case "set":
			return new MSet(raw.newPlace,raw.color);
		case "move":
			return new MMove(raw.newPlace,raw.oldPlace,raw.color);
		case "jump":
			return new MJump(raw.newPlace,raw.oldPlace,raw.color);
		case "delete":
			return new MDelete(raw.oldPlace,raw.color);
	}
}

Move.prototype.apply = function(game,confirm) {
	console.warn("Move apply: Do nothing: Children should implement this method.");
};

Move.prototype.available = function(game) {
	console.warn("Move available: Do nothing: Children should implement this method.");
};

Move.prototype.raw = function() {
	var raw = new Object();
	raw.newPlace = this.newPlace;
	raw.oldPlace = this.oldPlace;
	raw.color = this.color;
	raw.type = this.type;
	
	return raw;
};