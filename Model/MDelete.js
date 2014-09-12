MDelete.prototype = Object.create(Move.prototype);
MDelete.prototype.constructor = MDelete;

function MDelete (oldPlace, color) {
	if (!(oldPlace instanceof Place))
		console.error("MDelete: parameter oldPlace isn't a Place");
	if (color === undefined)
		console.error("MDelete: parameter color undefined")
	this.oldPlace = oldPlace;
	this.color = color;
	this.gamingPiece = undefined;
}

MDelete.prototype.apply = function(game) {
	if (!this.available(game)) {
		console.warn("Move apply: move isn't available");
		return;
	}
	this.gamingPiece = this.oldPlace.gamingPiece;
	this.oldPlace.gamingPiece = undefined;
	this.gamingPiece.place = "deleted";
	game.gpNumber[this.color==="white"?"black":"white"]--;
};

MDelete.prototype.undo = function(game) {
	this.gamingPiece.place = this.oldPlace;	
	this.oldPlace.gamingPiece = this.gamingPiece;
	game.gpNumber[this.color==="white"?"black":"white"]++;
};

MDelete.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}
	// send move information to main thread for drawing
	postMessage({
		tag:"move",
		msg:{
			gp:this.gamingPiece.id,
			pl:this.gamingPiece.place}
		});
};

MDelete.prototype.available = function(game) {	
	var g = this.oldPlace.gamingPiece;
	if (g===undefined)
		return false;
	if (g.color === this.color)
		return false;
	if (game.gpInMorris(g))
		return false;
	return true;
};

MDelete.prototype.toString = function() {
	return "MDelete " + this.color + ": " + this.oldPlace.id; 
};

MDelete.prototype.type = function() {
	return "delete";
}
