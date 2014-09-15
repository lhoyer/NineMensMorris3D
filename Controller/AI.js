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
AI.prototype.doMove = function(game) {
	if (Resources.logTime) {
		time = 0;
		var start = new Date().getTime();
	}
	var m = this.strategy.selectBestMove(game);
	if (Resources.logTime) {
		time += new Date().getTime() - start;
		console.log(""+time);	
	}
	match.doMove(m);
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