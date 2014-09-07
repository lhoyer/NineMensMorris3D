AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI() {
	this.standardDepth = 6;
	this.bestMove;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
AlphaBetaAI.prototype.selectBestMove = function(game) {
	this.miniMax(game,this.standardDepth,-1000000,1000000);	
	return this.bestMove;
};

AlphaBetaAI.prototype.miniMax = function(game,depth,alpha,beta) {
	var moves = game.getAvailableMoves();
	var deleteMoves;
	var bestEvaluation = alpha;
	var ev;

	if (depth == 0 || moves.length == 0 || game.status === "end")
		return game.evaluate();

	for (var i = 0; i < moves.length; i++) {
		game.doMove(moves[i]);
		if (game.status === "delete") {
			ev = this.miniMax(game, depth - 1, beta, bestEvaluation);
		}
		else
			ev = - this.miniMax(game, depth - 1, -beta, -bestEvaluation);
		game.undoLastMove();

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