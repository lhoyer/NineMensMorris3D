AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI() {
	this.standardDepth = 6;
	this.bestMove;
	this.log = "";
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
AlphaBetaAI.prototype.selectBestMove = function(game) {
	this.log = new Object();
	this.miniMax(game,this.standardDepth,-1000000,1000000,this.log);
	if (Resources.debugMiniMax)
		console.log(this.log);	
	return this.bestMove;
};

AlphaBetaAI.prototype.miniMax = function(game,depth,alpha,beta,log) {
	var moves = game.getAvailableMoves();
	var deleteMoves;
	var bestEvaluation = alpha;
	var ev;

	if (depth == 0 || moves.length == 0 || game.status==="end") {
		ev = game.evaluate();
		// avoid endless loops if the ai is going to win and can't decide for a strategy
		// -> follow strategy with less moves
		if (ev > 500)
			ev += depth*10;
		if (ev < -500)
			ev -= depth*10
		log["ev"] = game.estimator.log;
		return ev;
	}

	for (var i = 0; i < moves.length; i++) {
		var l = new Object();
		game.doMove(moves[i]);
		if (game.status === "delete") {
			ev = this.miniMax(game, depth - 1, bestEvaluation, beta,l);
		}
		else
			ev = - this.miniMax(game, depth - 1, -beta, -bestEvaluation,l);
		game.undoLastMove();
		log[moves[i].toString()+"\t"+ev] = l;


		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (bestEvaluation >= beta)
				break;
			if (depth == this.standardDepth)
				this.bestMove = moves[i];
		}
	}
	return bestEvaluation;
};