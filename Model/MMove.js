MMove.prototype = Object.create(Move.prototype);
MMove.prototype.constructor = MMove;

function MMove (oldPlace, newPlace, color) {
	if (!(newPlace instanceof Place))
		console.error("MMove: parameter newPlace isn't a Place");
	if (!(newPlace instanceof Place))
		console.error("MMove: parameter oldPlace isn't a Place");
	if (color === undefined)
		console.error("MMove: parameter color undefined")
	this.oldPlace = oldPlace;
	this.newPlace = newPlace;
	this.color = color;
	this.gamingPiece = undefined;
}

MMove.prototype.apply = function(game) {
	if (!this.available(game)) {
		console.warn("Move apply: move isn't available");
		return;
	}
	this.gamingPiece = this.oldPlace.gamingPiece;
	this.oldPlace.gamingPiece = undefined;
	this.gamingPiece.place = this.newPlace;
	this.newPlace.gamingPiece = this.gamingPiece;
};

MMove.prototype.undo = function(game) {
	this.gamingPiece.place = this.oldPlace;	
	this.oldPlace.gamingPiece = this.gamingPiece;
	this.newPlace.gamingPiece = undefined;
};

MMove.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}
	this.gamingPiece.assignPosFromPlace();
};

MMove.prototype.available = function(game) {	
	if (this.oldPlace === undefined || this.newPlace === undefined)
		return false;
	var g = this.oldPlace.gamingPiece;
	if (g === undefined)
		return false;
	if (g.color !== this.color)
		return false;
	if (this.newPlace.gamingPiece !== undefined)
		return false;
	if (!this.oldPlace.isConnected(this.newPlace))
		return false;

	return true;
};