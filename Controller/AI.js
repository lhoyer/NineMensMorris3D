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
AI.prototype.doMove = function() {
	var m = this.strategy.selectBestMove(match.gameStatus);
	match.doMove(m);
};

//-------------------------------------------------------------------------------------------------
// helpers
//-------------------------------------------------------------------------------------------------
AI.prototype.gameStatusChanged = function(game) {
	this.gameStatus = game;
	if (this.gameStatus.status !== "end") {
		if (this.gameStatus.gamerColor === this.color)
			this.doMove();
	}
};