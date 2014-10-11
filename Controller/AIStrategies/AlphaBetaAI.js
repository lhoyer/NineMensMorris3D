AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI(game) {
	this.bestMove = [];
	this.log = "";
	this.game = game;
	this.estimator = new Estimator(); 
	this.iDepth;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
AlphaBetaAI.prototype.selectBestMove = function() {
	this.log = new Object();

	if (Settings.aiIterative)
		var startDepth = 1;
	else
		var startDepth = Settings.aiDepth;
	this.bestMove = [];
	for (this.iDepth = startDepth; this.iDepth <= Settings.aiDepth; this.iDepth++) {
		var r = this.miniMax(this.iDepth,-1000000,1000000,this.log);
		if (r === "aborted")
			break;
	}

	if (Settings.debugMiniMax)
		postMessage({tag:"log",msg:this.log});

	var i = this.bestMove.length-1;
	if (r === "aborted") i--;
	return this.bestMove[i];
};

AlphaBetaAI.prototype.miniMax = function(depth,alpha,beta,log) {
	if (depth !== 0) var moves = this.game.getAvailableMoves();
	var deleteMoves;
	var bestEvaluation = alpha;
	var ev;

	if (Settings.aiIterative && new Date().getTime() - startAITime > 1000)
		return "aborted";

	if (depth == 0 || moves.length == 0 || this.game.status==="end") {
		ev = this.estimator.evaluate(this.game);
		// avoid endless loops if the ai is going to win and can't decide for a strategy
		// -> follow strategy with less moves
		if (ev > 500)
			ev += depth*10;
		if (ev < -500)
			ev -= depth*10
		if (Settings.debugMiniMax)
			log["ev"] = this.estimator.log;
		return ev;
	}

	if (Settings.aiRandom) {
		for (var i = 0; i < moves.length; i++) {
			var i2 = Math.floor(Math.random()*(moves.length));
			var tmp = moves[i];
			moves[i] = moves[i2];
			moves[i2] = tmp;
		}
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
		if (ev === "aborted")
			return ev;
		if (Settings.debugMiniMax)
			log[moves[i].toString()+"\t"+ev+","+beta] = l;


		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (bestEvaluation >= beta)
				break;
			if (depth == this.iDepth) {
				this.bestMove[this.iDepth] = moves[i];
			}
		}
		// if (ev == bestEvaluation && depth == this.iDepth)
		// 	this.bestMove[this.iDepth] = moves[i];
	}
	return bestEvaluation;
};