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
	// this.gamingPiece = game.getNewGP(this.color);
	// this.gamingPiece.place = this.newPlace;
};

MMove.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}
	this.gamingPiece.assignPosFromPlace();
};

MMove.prototype.available = function(game) {	
	// var g = game.getGPFromPlace(this.newPlace);
	// return (g===undefined);
};