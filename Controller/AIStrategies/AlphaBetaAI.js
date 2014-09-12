AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI(game) {
	this.standardDepth = 7;
	this.bestMove = [];
	this.log = "";
	this.game = game;
	this.estimator = new Estimator(game); 
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
AlphaBetaAI.prototype.selectBestMove = function() {
	this.log = new Object();
	this.miniMax(this.standardDepth,-1000000,1000000,this.log);
	if (Resources.debugMiniMax)
		postMessage({tag:"log",msg:this.log});	

	var m = this.bestMove[0];
	return m;
};

AlphaBetaAI.prototype.miniMax = function(depth,alpha,beta,log) {
	var moves = this.game.getAvailableMoves();
	var deleteMoves;
	var bestEvaluation = alpha;
	var ev;

	if (depth == 0 || moves.length == 0 || this.game.status==="end") {
		ev = this.estimator.evaluate();
		// avoid endless loops if the ai is going to win and can't decide for a strategy
		// -> follow strategy with less moves
		if (ev > 500)
			ev += depth*10;
		if (ev < -500)
			ev -= depth*10
		if (Resources.debugMiniMax)
			log["ev"] = this.estimator.log;
		return ev;
	}

	for (var i = 0; i < moves.length; i++) {
		var l = new Object();
		this.game.doMove(moves[i]);
		if (this.game.status === "delete") {
			ev = this.miniMax(depth - 1, bestEvaluation, beta,l);
		}
		else
			ev = - this.miniMax(depth - 1, -beta, -bestEvaluation,l);
		this.game.undoLastMove();
		if (Resources.debugMiniMax)
			log[moves[i].toString()+"\t"+ev] = l;


		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (bestEvaluation >= beta)
				break;
			if (depth == this.standardDepth) {
				this.bestMove = [];
				this.bestMove[0] = moves[i];
			}
		}
		if (ev == bestEvaluation && depth == this.standardDepth)
			this.bestMove.push(moves[i]);
	}
	return bestEvaluation;
};