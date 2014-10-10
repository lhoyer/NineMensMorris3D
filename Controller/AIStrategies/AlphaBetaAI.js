AlphaBetaAI.prototype = Object.create(AIStrategy.prototype);
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

function AlphaBetaAI(game) {
	this.bestMove = [];
	this.log = "";
	this.game = game;
	this.estimator = new Estimator(); 
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

	for (this.iDepth = startDepth; this.iDepth <= Settings.aiDepth; this.iDepth++) {
		this.newNS = new NodeSort();
		this.bestMove = [];
		this.numEv = 0;
		this.miniMax(this.iDepth,-1000000,1000000,this.log);
		console.log(this.numEv);
		this.oldNS = this.newNS;
		// this.oldNS.goUp();

		// if (new Date().getTime() - startAITime > 2000) {
		// 	console.log("depth: " + this.iDepth);
		// 	break;
		// }
	}

	if (Settings.debugMiniMax)
		postMessage({tag:"log",msg:this.log});
	var m;	
	if (Settings.aiRandom)
		m = this.bestMove[Math.floor(Math.random() * this.bestMove.length)];
	else
		m = this.bestMove[0];
	return m;
};

AlphaBetaAI.prototype.miniMax = function(depth,alpha,beta,log) {
	var moves = this.game.getAvailableMoves();
	var deleteMoves;
	var bestEvaluation = alpha;
	var ev;

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
		this.numEv++;
		return ev;
	}

	this.newNS.goDown();
	if (this.oldNS !== undefined) this.oldNS.goDown();
	if (this.oldNS !== undefined && depth !== 1) this.oldNS.sortNodes();
	for (var i = 0; i < moves.length; i++) {
		var l = new Object();
		if (this.oldNS === undefined || depth === 1)
			var move = moves[i];
		else {
			var move = moves[this.oldNS.sortedI(i)];
			if (move === undefined) {
				console.error("sorted move undefined");
			}
		}
		
		this.game.doMove(move);
		if (this.game.status === "delete") {
			ev = this.miniMax(depth - 1, bestEvaluation, beta,l);
		}
		else
			ev = - this.miniMax(depth - 1, -beta, -bestEvaluation,l);
		if (this.oldNS !== undefined && this.oldNS.ev !== undefined && this.oldNS.n.ev !== ev)
			console.log("problem");
		// if (this.oldNS !== undefined && this.oldNS.n.ev === ev)
		// 	console.log("works");
		this.newNS.addNodeEvaluation(i,ev);
		this.game.undoLastMove();
		if (Settings.debugMiniMax)
			log[move.toString()+"\t"+ev] = l;


		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (bestEvaluation >= beta) {
				break;
			}
			if (depth == this.iDepth) {
				this.bestMove = [];
				this.bestMove[0] = move;
			}
		}
		if (ev == bestEvaluation && depth == this.iDepth)
			this.bestMove.push(move);

		if (this.oldNS!==undefined) this.oldNS.next();
		this.newNS.next();
	}
	if (this.oldNS!==undefined) this.oldNS.goUp();
	this.newNS.goUp();
	return bestEvaluation;
};