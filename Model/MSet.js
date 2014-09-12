MSet.prototype = Object.create(Move.prototype);
MSet.prototype.constructor = MSet;

function MSet (newPlace, color) {
	if (!(newPlace instanceof Place))
		console.error("MSet: parameter newPlace isn't a Place");
	if (color === undefined)
		console.error("MSet: parameter color undefined")
	this.newPlace = newPlace;
	this.color = color;
	this.gamingPiece = undefined;
}

MSet.prototype.apply = function(game) {
	if (!this.available(game)) {
		console.warn("Move apply: move isn't available");
		return;
	}

	this.gamingPiece = game.getNewGP(this.color);
	this.gamingPiece.place = this.newPlace;
	this.newPlace.gamingPiece = this.gamingPiece;
};

MSet.prototype.undo = function(game) {
	this.gamingPiece.place = "new";	
	this.newPlace.gamingPiece = undefined;
};

MSet.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}

	// send move information to main thread for drawing
	postMessage({
		tag:"move",
		msg:{
			gp:this.gamingPiece.id,
			pl:this.newPlace.id}
		});
};

MSet.prototype.available = function(game) {	
	var g = this.newPlace.gamingPiece;
	return (g===undefined);
};

MSet.prototype.toString = function() {
	return "MSet " + this.color + ": " + this.newPlace.id; 
};

MSet.prototype.type = function() {
	return "set";
}
