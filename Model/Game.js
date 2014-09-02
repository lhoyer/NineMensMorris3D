function Game(raw) 
{
	if (raw === undefined) raw = false;

	this.gpWhite = new Array();
	this.gpBlack = new Array();
	this.gp = new Array();
	this.gamerColor = "white";
	this.status = "set";

	if (raw == true)
		return;

	var g;
	for (i = 0; i<5; i++) {
		g = new GamingPiece("white");
		g.gpModel.setPosition(new THREE.Vector3(-80,0,i*10-45));
		g.place = "new";
		this.gpWhite.push(g);
		this.gp.push(g);
		var g = new GamingPiece("black");
		g.gpModel.setPosition(new THREE.Vector3(80,0,i*10-45));
		g.place = "new";
		this.gpBlack.push(g);
		this.gp.push(g);
	}
}

Game.prototype.clone = function() {
	var game = new Game(true);
	var g;

	for (i = 0; i<5; i++) {
		g = this.gpWhite[i].clone();
		game.gpWhite.push(g);
		game.gp.push(g);
		g = this.gpBlack[i].clone();
		game.gpBlack.push(g);
		game.gp.push(g);
	}
	game.gamerColor = this.gamerColor;
	game.status = this.status;

	return game;	
};

//-------------------------------------------------------------------------------------------------
// Game Status
//-------------------------------------------------------------------------------------------------
Game.prototype.changeGamer = function() {
	if (this.gamerColor=="white")
		this.gamerColor = "black";
	else
		this.gamerColor = "white";
}

Game.prototype.newMorris = function(move) {
	var newPl = move.newPlace;
	if (move.newPlace===undefined)
		return false;
	var gp = this.getGPFromPlace(move.newPlace);
	if (this.gpInMorris(gp))
		return true;
	else
		return false;
};

//-------------------------------------------------------------------------------------------------
// Game Status 2
//-------------------------------------------------------------------------------------------------
Game.prototype.getAvailableMoves = function() {

}

Game.prototype.evaluate = function() {

}

//-------------------------------------------------------------------------------------------------
// Move handling
//-------------------------------------------------------------------------------------------------
Game.prototype.doMove = function(move) {
	if (confirm===undefined) confirm = false;
	if (move===undefined) {
		console.error("Game doMove: parameter move undefined");
		return;
	}
	if (!(move instanceof Move)) {
		console.error("Game doMove: parameter move doesn't inherit from Move");
		return;
	}
	if (!move.available(this)) {
		return;
	}

	var newGame = this.clone();
	move.apply(newGame);

	if (newGame.newMorris(move))
		newGame.status = "delete";
	else {
		newGame.changeGamer();
		if (newGame.getNewGP(newGame.gamerColor) !== undefined)
			newGame.status = "set";
		else if (newGame.countGamingPieces(newGame.gamerColor) < 4)
			newGame.status = "jump";
		else
			newGame.status = "move";
	}

	return newGame;
}


//-------------------------------------------------------------------------------------------------
// Gaming Piece helpers
//-------------------------------------------------------------------------------------------------
Game.prototype.getNewGP = function(color) {
	var gp = this.getGPsWithColor(color);

	for (var i = 0; i < gp.length; i++)
		if (gp[i].place === "new")
			return gp[i];

	return undefined;
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
	for (var i = 0; i < this.gp.length; i++)
		if (this.gp[i].place === place)
			return this.gp[i];
	return undefined;
}

Game.prototype.gpInMorris = function(gp) {
	var pl = gp.place;
	var col = gp.color;

	for (var i = 0; i < pl.morrises.length; i++) {
		var b = 0;
		for (var j = 0; j < pl.morrises[i].length; j++) {
			var testGP = this.getGPFromPlace(pl.morrises[i][j]);
			if (testGP !== undefined && col === testGP.color)
				b++; 
		}
		if (b==3)
			return true;
	}
	return false;
};

Game.prototype.countGamingPieces = function(color) {
	var cnt = 0;
	var gamingPieces;
	if (color == "white")
		gamingPieces = this.gpWhite;
	else
		gamingPieces = this.gpBlack;

	for (var i = 0; i < gamingPieces.length; i++) {
		var pl = gamingPieces[i].place;
		if (pl !== undefined && pl !== "new" && pl !== "deleted")
			cnt++;
	}

	return cnt;
}