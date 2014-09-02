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
	this.gamingPiece = game.getGPFromPlace(this.oldPlace);
	this.gamingPiece.place = "deleted";
};

MDelete.prototype.confirm = function() {
	if (this.gamingPiece === undefined) {
		console.warn("Move confirm: gaming piece undefined");
		return;
	}
	this.gamingPiece.assignPosFromPlace();
};

MDelete.prototype.available = function(game) {	
	var g = game.getGPFromPlace(this.oldPlace);
	if (g===undefined)
		return false;
	if (g.color === this.color)
		return false;
	if (game.gpInMorris(g))
		return false;
	return true;
};