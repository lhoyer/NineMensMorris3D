function Estimator (game) {
	this.game = game;
	this.log;

	this.cset = [18,26,1,6,12,7];
	this.cmove = [14,43,10,8,7,42,1086];
	this.cjump = [10,1,16,1190];
	this.cwin = [1100];
}

Estimator.prototype.evaluate = function() {
	//get player who does last move
	var col = this.game.gamerColor;
	var oppCol = this.game.gamerColor==="white"?"black":"white";
	var morrisInfo = this.morrisInfo(col);
	var oppMorrisInfo = this.morrisInfo(oppCol);
	var evaluation = 0;
	var r = [], c;
	this.log = "";

	var status = this.game.status;
	if (status === "delete")
		status = this.game.lastStatus;

	if (status === "set") {
		c = this.cset;
		r[0] = this.newMorris(col) - this.newMorris(oppCol);
		r[1] = morrisInfo.morrisNum - oppMorrisInfo.morrisNum;
		r[2] = this.blockedOpponentGPsNum(col) - this.blockedOpponentGPsNum(oppCol);
		r[3] = this.game.gpNumber[col] - this.game.gpNumber[oppCol];
		r[4] = morrisInfo.closableMorrisNum - oppMorrisInfo.closableMorrisNum;
		r[5] = morrisInfo.closableMorrisNum-1 - oppMorrisInfo.closableMorrisNum+1;
	}
	else if (status === "move") {
		c = this.cmove;
		r[0] = this.newMorris(col) - this.newMorris(oppCol);
		r[1] = morrisInfo.morrisNum - oppMorrisInfo.morrisNum;
		r[2] = this.blockedOpponentGPsNum(col) - this.blockedOpponentGPsNum(oppCol);
		r[3] = this.game.gpNumber[col] - this.game.gpNumber[oppCol];
		r[4] = morrisInfo.closableMorrisNum - oppMorrisInfo.closableMorrisNum;
		r[5] = this.doubleMorrisNum(col) - this.doubleMorrisNum(oppCol);
		r[6] = this.win(col) - this.win(oppCol);
	}
	else if (status === "jump") {
		c = this.cjump;
		r[0] = morrisInfo.closableMorrisNum - oppMorrisInfo.closableMorrisNum;
		r[1] = morrisInfo.closableMorrisNum-1 - oppMorrisInfo.closableMorrisNum+1;
		r[2] = this.newMorris(col) - this.newMorris(oppCol);
		r[3] = this.win(col) - this.win(oppCol);
	}
	else if (status === "end") {
		c = this.cwin;
		r[0] = this.win(col) - this.win(oppCol);
		evaluation = this.win(col) - this.win(oppCol);
	}

	for (var i = 0; i < r.length; i++) {
		if (r[i]===undefined || c[i]===undefined) 
			console.warn("Estimator evaluate: r or c at "+i+" unknown.");
		else {
			evaluation += r[i]*c[i];
			this.log += "["+i+"]" + r[i] + "*" + c[i] + "=" + r[i]*c[i];
		}
	}

	// evaluation = this.gpNumber(col) - this.gpNumber(oppCol);

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

Estimator.prototype.blockedOpponentGPsNum = function(color) {
	var blockedGPs = 0;
	var opponentGPs = this.game.getGPsWithOtherColor(color);

	for (var i = 0; i < opponentGPs.length; i++) {
		var pl = opponentGPs[i].place
		if (pl !== "new" && pl !== "deleted") {
			var blockedConnections = 0;
			for (var j = 0; j < pl.connections.length; j++) {
				if (pl.connections[j].gamingPiece !== undefined) {
					blockedConnections++;
				}
			}
			if (blockedConnections===pl.connections.length)
				blockedGPs++;			
		}
	}

	return blockedGPs;
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