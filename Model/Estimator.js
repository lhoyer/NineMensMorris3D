function Estimator () {
	this.log;

	this.c = undefined;
}

Estimator.prototype.evaluate = function(game) {
	this.game = game;

	//get player who does last move
	var col = this.game.gamerColor;
	var oppCol = this.game.gamerColor==="white"?"black":"white";
	var morrisInfo = this.morrisInfo(col);
	var oppMorrisInfo = this.morrisInfo(oppCol);
	var gpFreedom = this.gpFreedom(col);
	var oppGpFreedom = this.gpFreedom(oppCol);
	var evaluation = 0;
	var r = [], c;
	this.log = "";

	var status = this.game.status;
	if (status === "delete")
		status = this.game.lastStatus;

	if (status === "set") {
		c = this.c.cset;
		r[0] = this.newMorris(col) - this.newMorris(oppCol);
		r[1] = morrisInfo.morrisNum - oppMorrisInfo.morrisNum;
		r[2] = oppGpFreedom.blockedGPs - gpFreedom.blockedGPs;
		r[3] = this.game.gpNumber[col] - this.game.gpNumber[oppCol];
		r[4] = morrisInfo.closableMorrisNum - oppMorrisInfo.closableMorrisNum;
		r[5] = morrisInfo.closableMorrisNum-1 - oppMorrisInfo.closableMorrisNum+1;
		r[6] = gpFreedom.freeConnections - oppGpFreedom.freeConnections;
	}
	else if (status === "move") {
		c = this.c.cmove;
		r[0] = this.newMorris(col) - this.newMorris(oppCol);
		r[1] = morrisInfo.morrisNum - oppMorrisInfo.morrisNum;
		r[2] = oppGpFreedom.blockedGPs - gpFreedom.blockedGPs;
		r[3] = this.game.gpNumber[col] - this.game.gpNumber[oppCol];
		r[4] = morrisInfo.closableMorrisNum - oppMorrisInfo.closableMorrisNum;
		r[5] = this.doubleMorrisNum(col) - this.doubleMorrisNum(oppCol);
		r[6] = gpFreedom.freeConnections - oppGpFreedom.freeConnections;
		//r[6] = this.win(col) - this.win(oppCol);
	}
	else if (status === "jump") {
		c = this.c.cjump;
		r[0] = morrisInfo.closableMorrisNum - oppMorrisInfo.closableMorrisNum;
		r[1] = morrisInfo.closableMorrisNum-1 - oppMorrisInfo.closableMorrisNum+1;
		r[2] = this.newMorris(col) - this.newMorris(oppCol);
		//r[3] = this.win(col) - this.win(oppCol);
	}
	else if (status === "end") {
		c = this.c.cwin;
		r[0] = this.win(col) - this.win(oppCol);
		evaluation = this.win(col) - this.win(oppCol);
	}

	if (this.c === undefined)
		console.warn("Estimator evaluate: estimator coefficient undefined");
	for (var i = 0; i < r.length; i++) {
		if (r[i]===undefined) 
			console.warn("Estimator evaluate: r at "+i+" unknown. " + status);
		else if (c[i]===undefined) 
			console.warn("Estimator evaluate: c at "+i+" unknown. " + status);
		else {
			evaluation += r[i]*c[i];
			this.log += "["+i+"]" + r[i] + "*" + c[i] + "=" + r[i]*c[i];
		}
	}

	// evaluation = this.game.gpNumber[col] - this.game.gpNumber[oppCol];

	return evaluation;
};

Estimator.prototype.newMorris = function(color) {
	return this.game.gamerColor === color && this.game.newMorris();
};

Estimator.prototype.morrisInfo = function(color) {
	var morrises = this.game.field.morrises;
	var morNum = 0;
	var closableMorrisNum = 0;

	for (var i = 0; i < morrises.length; i++) {
		var n = 0;
		for (var j = 0; j < morrises[i].length; j++) {
			//own piece in morris
			if (morrises[i][j].gamingPiece !== undefined &&
				morrises[i][j].gamingPiece.color === color) {
				n++;
			}
			//opponent blocks morris
			else if (morrises[i][j].gamingPiece !== undefined &&
				morrises[i][j].gamingPiece.color !== color) {
				n--;
			}
			//morris can be closed by a move
			else if (this.game.status === "move") {
				n--
				for (var k = 0; k < morrises[i][j].connections.length; k++) {
					//connections is part of this morris
					if (morrises[i][j].connections[k] === morrises[i][0] ||
						morrises[i][j].connections[k] === morrises[i][1] ||
						morrises[i][j].connections[k] === morrises[i][2])
						continue;
					if (morrises[i][j].connections[k].gamingPiece !== undefined &&
						morrises[i][j].connections[k].gamingPiece.color === color) {
						n++;
						break;
					}
				}
			}
		}
		if (n==3)
			morNum++;
		if (n==2)
			closableMorrisNum++;
	}

	return {morrisNum:morNum,
			closableMorrisNum:closableMorrisNum};
};

Estimator.prototype.gpFreedom = function(color) {
	var freeConnections = 0;
	var blockedGPs = 0;
	var gps = this.game.getGPsWithColor(color);

	for (var i = 0; i < gps.length; i++) {
		var pl = gps[i].place
		if (pl !== "new" && pl !== "deleted") {
			var blockedConnections = 0;

			for (var j = 0; j < pl.connections.length; j++) {
				if (pl.connections[j].gamingPiece !== undefined) {
					blockedConnections++;
				}
				else
					freeConnections++;
			}
			if (blockedConnections===pl.connections.length)
				blockedGPs++;			
		}
	}

	return {blockedGPs:blockedGPs,freeConnections:freeConnections};
};

Estimator.prototype.doubleMorrisNum = function(color) {
	var gamingPieces = this.game.getGPsWithColor(color);
	var doubleMorrisNum = 0;
	var move;
	var plOld,plNew;

	for (var i = 0; i < gamingPieces.length; i++) {
		if (gamingPieces[i] === undefined || 
			gamingPieces[i].place === "deleted" || 
			gamingPieces[i].place === "new")
			continue;
		plOld = gamingPieces[i].place;
		for (var j = 0; j < plOld.connections.length; j++) {
			plNew = plOld.connections[j];
			move = new MMove(plOld,plNew,color);
			if (move.available(this.game)) {
				move.apply(this.game);
				if (this.game.newMorris(move))
					doubleMorrisNum++;
				move.undo(this.game);
			}
		}
	}

	return doubleMorrisNum;
};

Estimator.prototype.win = function(color) {
	return this.game.gamerColor !== color && this.game.status === "end";
};