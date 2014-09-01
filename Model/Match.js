function Match() 
{
	this.field = new Field();
	this.gameHistory = new Array();
	this.gameStatus = new Game();
	this.gameHistory.push(this.gameStatus);
}

Match.prototype.doMove = function(move, confirm) {
	if (confirm===undefined) confirm = false;
	if (move===undefined) {
		console.error("Match doMove: parameter move undefined");
		return;
	}
	if (!(move instanceof Move)) {
		console.error("Match doMove: parameter move doesn't inherit from Move");
		return;
	}

	this.gameStatus = this.gameStatus.clone();
	this.gameHistory.push(this.gameStatus);
	move.apply(this.gameStatus,confirm);
}