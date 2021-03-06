function Game(raw) 
{
	this.field = new Field();
	this.gpWhite = new Array();
	this.gpBlack = new Array();
	this.gp = new Array();
	this.gamerColor = "white";
	this.status = "set";
	this.gamePhase = {
		white:"set",
		black:"set"
	}
	this.history = [];
	this.gpNumber = new Object();
	this.gpNumber["white"] = 9;
	this.gpNumber["black"] = 9;

	// create from raw object
	if (raw !== undefined && raw.gamerColor !== undefined)
	{
		this.gamerColor = raw.gamerColor;
		this.status = raw.status;
		for (var i = 0; i < 18; i++) {
			var gp = new GamingPiece(raw.gp[i],this);
			this.gp.push(gp);
			if (gp.color == "white")
				this.gpWhite.push(gp);
			else
				this.gpBlack.push(gp);
		}
	}
	else
	{
		var g;
		for (i = 0; i<9; i++) {
			g = new GamingPiece("white",i);
			this.gpWhite.push(g);
			this.gp.push(g);
		}
		for (i = 0; i<9; i++) {
			var g = new GamingPiece("black",i+9);
			this.gpBlack.push(g);
			this.gp.push(g);
		}
	}
}

Game.prototype.raw = function() {
	var raw = {
		gamerColor : this.gamerColor,
		status : this.status,
		gp : []
	}
	for (var i = 0; i < 18; i++)
		raw.gp.push(this.gp[i].raw());
	return raw;
};

//-------------------------------------------------------------------------------------------------
// Game Status
//-------------------------------------------------------------------------------------------------
Game.prototype.changeGamer = function() {
	if (this.gamerColor==="white")
		this.gamerColor = "black";
	else
		this.gamerColor = "white";
}

Game.prototype.newMorris = function(move) {
	if (move === undefined)
		move = this.history[this.history.length-1].move;
	if (move === undefined)
		return;

	var newPl = move.newPlace;
	if (move.newPlace===undefined || move.newPlace.gamingPiece===undefined)
		return false;
	var gp = move.newPlace.gamingPiece;
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
	var places = this.field.places;
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

//-------------------------------------------------------------------------------------------------
// Move handling
//-------------------------------------------------------------------------------------------------
Game.prototype.doMove = function(move) {
	if (move===undefined) {
		console.error("Game doMove: parameter move undefined");
		return false;
	}
	if (!(move instanceof Move)) {
		console.error("Game doMove: parameter move doesn't inherit from Move");
		return false;
	}
	if (!move.available(this)) {
		return false;
	}

	this.history.push({move:move,status:this.status,color:this.gamerColor});
	move.apply(this);

	var enterOtherStates = true;
	if (this.newMorris()) {
		enterOtherStates = false;
		this.lastStatus = this.status;
		this.status = "delete";
		if (this.getAvailableMoves().length == 0)
			enterOtherStates = true;
	}
	if (enterOtherStates)
	{
		this.changeGamer();
		if (this.getNewGP(this.gamerColor) !== undefined)
			this.status = "set";
		else if (this.countGamingPieces(this.gamerColor) < 4)
			this.status = "jump";
		else
			this.status = "move";
	}
	if (this.countGamingPieces(this.gamerColor) < 3 ||
		this.status == "move" && this.getAvailableMoves().length==0) {
		this.lastStatus = this.status;
		this.status = "end";
	}

	// determine game phase for evaluation
	if (this.getNewGP("white") !== undefined)
		this.gamePhase["white"] = "set";
	else if (this.countGamingPieces("white") < 4)
		this.gamePhase["white"] = "jump";
	else
		this.gamePhase["white"] = "move";
	if (this.getNewGP("black") !== undefined)
		this.gamePhase["black"] = "set";
	else if (this.countGamingPieces("black") < 4)
		this.gamePhase["black"] = "jump";
	else
		this.gamePhase["black"] = "move";



	// estimate after gamer change, because the estimation in minmax is done in leaf after gamer change
	// so it considers the gamer change
	return true;
}

Game.prototype.undoLastMove = function() {
	var last = this.history[this.history.length-1];
	last.move.undo(this);
	this.status = last.status;
	this.gamerColor = last.color;
	this.history.splice(this.history.length-1,1);
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

Game.prototype.gpInMorris = function(gp) {
	var pl = gp.place;
	var col = gp.color;

	for (var i = 0; i < pl.morrises.length; i++) {
		var b = 0;
		for (var j = 0; j < pl.morrises[i].length; j++) {
			var testGP = pl.morrises[i][j].gamingPiece;
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