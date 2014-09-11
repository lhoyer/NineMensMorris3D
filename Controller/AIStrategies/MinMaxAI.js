MinMaxAI.prototype = Object.create(AIStrategy.prototype);
MinMaxAI.prototype.constructor = MinMaxAI;

function MinMaxAI() {
	this.standardDepth = 5;
	this.bestMove;
	this.log = "";
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
MinMaxAI.prototype.selectBestMove = function(game) {
	this.log = new Object();
	this.miniMax(game,this.standardDepth,this.log);
	if (Resources.debugMiniMax)
		console.log(this.log);
	return this.bestMove;
};

MinMaxAI.prototype.miniMax = function(game,depth,log) {
	var moves = game.getAvailableMoves();		
	var bestEvaluation = -100000;
	var ev;

	if (depth == 0 || moves.length == 0 || game.status==="end") {
		ev = game.evaluate();
		if (Resources.debugMiniMax)
			log["ev"] = game.estimator.log;
		return ev;
	}

	for (var i = 0; i < moves.length; i++) {
		//log
		var l = new Object();

		game.doMove(moves[i]);
		if (game.status === "delete") {
			ev = this.miniMax(game, depth - 1,l);
		}
		else
			ev = - this.miniMax(game, depth - 1,l);
		game.undoLastMove();
		if (Resources.debugMiniMax)
			log[moves[i].toString()+"\t"+ev] = l;

		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (depth == this.standardDepth) {
				this.bestMove = moves[i];
			}
		}
	}
	return bestEvaluation;
};