RandomController.prototype = Object.create(Controller.prototype);
RandomController.prototype.constructor = RandomController;

function RandomController(match,color)
{
	Controller.call(this,match,color);
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
RandomController.prototype.doMove = function() {
	var moves = this.gameStatus.getAvailableMoves();
	var m = Math.floor((Math.random() * moves.length));
	match.doMove(moves[m]);
};

//-------------------------------------------------------------------------------------------------
// helpers
//-------------------------------------------------------------------------------------------------
RandomController.prototype.gameStatusChanged = function(game) {
	this.gameStatus = game;
	if (this.gameStatus.status !== "end") {
		if (this.gameStatus.gamerColor === this.color)
			this.doMove();
	}
};