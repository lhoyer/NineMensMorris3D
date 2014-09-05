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
AI.prototype.doMove = function(game) {
	var m = this.strategy.selectBestMove(game);
	match.doMove(m);
};

//-------------------------------------------------------------------------------------------------
// helpers
//-------------------------------------------------------------------------------------------------
AI.prototype.gameChanged = function(game) {
	this.game = game;
	if (this.game.status !== "end") {
		if (this.game.gamerColor === this.color)
			this.doMove(game);
	}
};