function RandomAI() {}
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
RandomController.prototype.selectBestMove = function() {
	var moves = this.gameStatus.getAvailableMoves();
	var m = Math.floor((Math.random() * moves.length));
	
	return moves[m];
};