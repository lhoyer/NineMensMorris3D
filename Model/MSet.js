MSet.prototype = Object.create(Move.prototype);
MSet.prototype.constructor = MSet;

function MSet (newPlace, color) {
	if (!(newPlace instanceof Place))
		console.error("MSet: parameter newPlace isn't a Place");
	if (color === undefined)
		console.error("MSet: parameter color undefined")
	this.newPlace = newPlace;
	this.color = color;
}

MSet.prototype.apply = function(game,confirm) {
	var gp = game.getUnusedGP(this.color);
	gp.place = this.newPlace;
	if (confirm)
		gp.assignPosFromPlace();
};