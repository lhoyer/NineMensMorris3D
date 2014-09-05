AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI() {
	this.standardDepth = 8;
	this.bestMove;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
AlphaBetaAI.prototype.selectBestMove = function(game) {
	this.miniMax(game,this.standardDepth,-10000,10000);	
	return this.bestMove;
};

AlphaBetaAI.prototype.miniMax = function(game,depth,alpha,beta) {
	var moves = game.getAvailableMoves();
	var bestEvaluation = alpha;
	var ev;

	if (depth == 0 || moves.length == 0)
		return game.evaluate();

	for (var i = 0; i < moves.length; i++) {
		game.doMove(moves[i]);
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