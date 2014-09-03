AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI() {
	this.standardDepth = 5;
	this.bestMove;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
AlphaBetaAI.prototype.selectBestMove = function(game) {
	this.miniMax(game,this.standardDepth);	
	return this.bestMove;
};

AlphaBetaAI.prototype.miniMax = function(game,depth,alpha,beta) {
	var moves = game.getAvailableMoves();
	var testGame;
	var bestEvaluation = alpha;
	var ev;

	if (depth == 0 || moves.length == 0)
		return game.evaluate();

	for (var i = 0; i < moves.length; i++) {
		testGame = game.doMove(moves[i]);
		ev = - this.miniMax(testGame, depth - 1, -beta, -bestEvaluation);
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