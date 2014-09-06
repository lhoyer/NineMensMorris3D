MinMaxAI.prototype = Object.create(AIStrategy.prototype);
MinMaxAI.prototype.constructor = MinMaxAI;

function MinMaxAI() {
	this.standardDepth = 5;
	this.bestMove;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
MinMaxAI.prototype.selectBestMove = function(game) {
	this.miniMax(game,this.standardDepth);
	return this.bestMove;
};

MinMaxAI.prototype.miniMax = function(game,depth) {
	var moves = game.getAvailableMoves();		
	var bestEvaluation = -100000;
	var ev;

	if (depth == 0 || moves.length == 0)
		return game.evaluate();

	for (var i = 0; i < moves.length; i++) {
		game.doMove(moves[i]);
		ev = - this.miniMax(game, depth - 1);
		game.undoLastMove();
		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (depth == this.standardDepth) {
				this.bestMove = moves[i];
			}
		}
	}
	return bestEvaluation;
};