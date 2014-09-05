MJump.prototype = Object.create(Move.prototype);
MJump.prototype.constructor = MJump;

function MJump (oldPlace, newPlace, color) {
	if (!(newPlace instanceof Place))
		console.error("MJump: parameter newPlace isn't a Place");
	if (!(newPlace instanceof Place))
		console.error("MJump: parameter oldPlace isn't a Place");
	if (color === undefined)
		console.error("MJump: parameter color undefined")
	this.oldPlace = oldPlace;
	this.newPlace = newPlace;
	this.color = color;
	this.gamingPiece = undefined;
}

MJump.prototype.apply = function(game) {
	if (!this.available(game)) {
		console.warn("Move apply: move isn't available");
		return;
	}
	this.gamingPiece = game.getGPFromPlace(this.oldPlace);
	this.gamingPiece.place = this.newPlace;
};

MJump.prototype.undo = function(game) {
	this.gamingPiece.place = this.oldPlace;	
};

MJump.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}
	this.gamingPiece.assignPosFromPlace();
};

MJump.prototype.available = function(game) {	
	if (this.oldPlace === undefined || this.newPlace === undefined)
		return false;
	var g = game.getGPFromPlace(this.oldPlace);
	if (g === undefined)
		return false;
	if (g.color !== this.color)
		return false;
	if (game.getGPFromPlace(this.newPlace) !== undefined)
		return false;

	return true;
};