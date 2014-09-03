RandomAI.prototype = Object.create(AIStrategy.prototype);
RandomAI.prototype.constructor = RandomAI;

function RandomAI() {
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
RandomAI.prototype.selectBestMove = function(game) {
	var moves = game.getAvailableMoves();
	var m = Math.floor((Math.random() * moves.length));
	
	return moves[m];
};