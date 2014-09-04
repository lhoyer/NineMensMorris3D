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
	time = 0;
	this.miniMax(game,this.standardDepth);
	console.log(""+time);	
	return this.bestMove;
};

var time = 0;
MinMaxAI.prototype.miniMax = function(game,depth) {
	var moves = game.getAvailableMoves();		
	var testGame;
	var bestEvaluation = -100000;
	var ev;

	if (depth == 0 || moves.length == 0)
		return game.evaluate();

	for (var i = 0; i < moves.length; i++) {
		testGame = game.doMove(moves[i]);
		ev = - this.miniMax(testGame, depth - 1);
		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (depth == this.standardDepth) {
				this.bestMove = moves[i];
			}
		}
	}
	return bestEvaluation;
};