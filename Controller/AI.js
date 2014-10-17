AI.prototype = Object.create(Controller.prototype);
AI.prototype.constructor = AI;

function AI(match,color,strategy)
{
	Controller.call(this,match,color);
	this.strategy = strategy;
}

//-------------------------------------------------------------------------------------------------
// move
//-------------------------------------------------------------------------------------------------
var time = 0;
var startAITime;
AI.prototype.doMove = function(game) {
	time = 0;
	startAITime = new Date().getTime();
	var m = this.strategy.selectBestMove(game);
	if (Settings.logTime) {
		time += new Date().getTime() - startAITime;
		console.log(""+time);	
	}
	match.doMove(m);
	if (Settings.debugMiniMax)
		console.debug("Evaluation " + this.game.gamerColor + ": " + 
					  this.strategy.estimator.evaluate(game));
};

//-------------------------------------------------------------------------------------------------
// helpers
//-------------------------------------------------------------------------------------------------
AI.prototype.gameChanged = function(game) {
	var accept = game.gamerColor === this.color;
	this.game = game;
	if (this.game.status !== "end") {
		if (accept)
			this.doMove(game);
	}
	return accept;
};