function Game(raw) 
{
	if (raw === undefined) raw = false;

	this.gpWhite = new Array();
	this.gpBlack = new Array();
	this.gp = new Array();

	if (raw == true)
		return;

	var g;
	for (i = 0; i<9; i++) {
		g = new GamingPiece("white");
		g.gpModel.setPosition(new THREE.Vector3(-80,0,i*10-45));
		this.gpWhite.push(g);
		this.gp.push(g);
		var g = new GamingPiece("black");
		g.gpModel.setPosition(new THREE.Vector3(80,0,i*10-45));
		this.gpBlack.push(g);
		this.gp.push(g);
	}
}

Game.prototype.getUnusedGP = function(color) {
	var gp = this.getGPsWithColor(color);

	for (var i = 0; i < gp.length; i++)
		if (gp[i].place === undefined)
			return gp[i];
}

Game.prototype.getGPsWithColor = function(color) {
	var gp;
	if (color == "white")
		gp = this.gpWhite;
	else if (color == "black")
		gp = this.gpBlack;
	else 
		console.error("Game getSelectableGP: color unknown");
	return gp;
}

Game.prototype.getGPFromPlace = function(place) {
	for (var i = 0; i < gp.length; i++)
		if (gp[i].place === place)
			return gp[i];
}

Game.prototype.clone = function() {
	var game = new Game(true);
	var g;

	for (i = 0; i<9; i++) {
		g = this.gpWhite[i].clone();
		game.gpWhite.push(g);
		game.gp.push(g);
		g = this.gpBlack[i].clone();
		game.gpBlack.push(g);
		game.gp.push(g);
	}

	return game;	
};