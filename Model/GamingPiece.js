// data: normal mode color of gp; raw mode raw object
// game: only use this parameter in raw mode
function GamingPiece(data, game) {
	this.color;
	this.place = "new";

	if (data === undefined)
		return;

	// create from raw object 
	if (data !== undefined && data.plId !== undefined && game !== undefined)
	{
		this.color = data.color;
		if (data.plId === "new" || data.plId === "deleted")
			this.place = data.plId;
		else {
			var pl = game.field.places[game.field.plIdx(data.plId[0],data.plId[1],data.plId[2])];
			this.place = pl;
			pl.gamingPiece = this;
		}
	}
	else
	{
		this.color = data;
	}
}

GamingPiece.prototype.raw = function() {
	var raw = new Object();
	raw.color = this.color;
	if (this.place === "new" || this.place === "deleted")
		raw.plId = this.place;
	else
		raw.plId = this.place.id;
	return raw;
};