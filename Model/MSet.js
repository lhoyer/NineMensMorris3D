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
	this.gamingPiece = game.getNewGP(this.color);
	this.gamingPiece.place = this.newPlace;
};

MSet.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}
	this.gamingPiece.assignPosFromPlace();
};