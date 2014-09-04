function Game(raw) 
{
	this.gpWhite = new Array();
	this.gpBlack = new Array();
	this.gp = new Array();
	this.gamerColor = "white";
	this.status = "set";
	this.lastMove;

	// create from raw object
	if (raw !== undefined && raw.gamerColor !== undefined)
	{
		this.gamerColor = raw.color;
		this.status = raw.status;
		this.lastMove = new Move(raw.lastMove);

	}

	if (raw === true)
		return;

	var g;
	for (i = 0; i<9; i++) {
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

Game.prototype.rawGame = function() {
	var raw = {
		gamerColor : this.gamerColor,
		status : this.status,
		lastMove : this.lastMove.raw(),
		gp : []
	}
	for (var i = 0; i < 18; i++)
		raw.gp.push(this.gp[i].raw());
};

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

Game.prototype.newMorris = function() {
	var move = this.lastMove;
	if (move === undefined)
		return;

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
	var move;
	var moves = new Array();
	var gamingPieces = this.getGPsWithColor(this.gamerColor);
	var places = match.field.places;
	var plOld, plNew;

	if (this.status == "set")
	{
		for (var i = 0; i < places.length; i++) {
			plNew = places[i];
			move = new MSet(plNew,this.gamerColor);
			if (move.available(this))
				moves.push(move);
		}
	}
	if (this.status == "move")
	{
		for (var i = 0; i < gamingPieces.length; i++) {
			if (gamingPieces[i].place === "deleted")
				continue;
			plOld = gamingPieces[i].place;
			for (var j = 0; j < plOld.connections.length; j++) {
				plNew = plOld.connections[j];
				move = new MMove(plOld,plNew,this.gamerColor);
				if (move.available(this))
					moves.push(move);
			}
		}
	}
	if (this.status == "jump")
	{
		for (var i = 0; i < gamingPieces.length; i++) {
			if (gamingPieces[i].place === "deleted")
				continue;
			plOld = gamingPieces[i].place;
			for (var j = 0; j < places.length; j++) {
				plNew = places[j];
				move = new MJump(plOld,plNew,this.gamerColor);
				if (move.available(this))
					moves.push(move);
			}
		}
	}
	if (this.status == "delete")
	{
		if (this.gamerColor == "white")
			gamingPieces = this.gpBlack;
		else
			gamingPieces = this.gpWhite;
		for (var i = 0; i < gamingPieces.length; i++) {
			if (gamingPieces[i].place === "deleted" || gamingPieces[i].place === "new")
				continue;
			plOld = gamingPieces[i].place;
			move = new MDelete(plOld,this.gamerColor);
			if (move.available(this))
				moves.push(move);
		}
	}

	return moves;
}

//do not call out of class
Game.prototype.evaluate = function() {
	//get player who does last move
	var col = this.gamerColor=="white"?"black":"white"

	var myGPs = this.getGPsWithColor(col);
	var yourGPs = this.getGPsWithOtherColor(col);
	var evaluation = 0;

	for (var i = 0; i < myGPs.length; i++) {
		if (myGPs[i].place !== "deleted")
			evaluation++;
	}
	for (var i = 0; i < yourGPs.length; i++) {
		if (yourGPs[i].place === "deleted")
			evaluation++;
	}
	// if (this.newMorris())
	// 	evaluation++;
	// if (this.status == "end")
	// 	evaluation+=10;

	return evaluation;
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

	var enterOtherStates = true;
	if (newGame.newMorris()) {
		enterOtherStates = false;
		newGame.status = "delete";
		if (newGame.getAvailableMoves().length == 0)
			enterOtherStates = true;
	}
	if (enterOtherStates)
	{
		newGame.changeGamer();
		if (newGame.getNewGP(newGame.gamerColor) !== undefined)
			newGame.status = "set";
		else if (newGame.countGamingPieces(newGame.gamerColor) < 4)
			newGame.status = "jump";
		else
			newGame.status = "move";
	}
	if (newGame.countGamingPieces(newGame.gamerColor) < 3 ||
		newGame.getAvailableMoves().length==0)
		newGame.status = "end";

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

Game.prototype.getGPsWithOtherColor = function(color) {
	var gp;
	if (color == "white")
		gp = this.gpBlack;
	else if (color == "black")
		gp = this.gpWhite;
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
	var gamingPieces = this.getGPsWithColor(color);

	for (var i = 0; i < gamingPieces.length; i++) {
		var pl = gamingPieces[i].place;
		if (pl !== undefined && pl !== "deleted")
			cnt++;
	}

	return cnt;
}