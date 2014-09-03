function Match() 
{
	this.field = new Field();
	this.gameHistory = new Array();
	this.gameStatus = new Game();
	this.gameHistory.push(this.gameStatus);
	this.controllers = new Array();
}

Match.prototype.doMove = function(move) {
	var newGame = this.gameStatus.doMove(move);
	if (newGame === undefined) {
		overlay.help.textContent = "Move isn't available";
		return;
	}
	else
		overlay.help.textContent = "";
	this.gameStatus = newGame;
	this.gameHistory.push(this.gameStatus);

	move.confirm();
	if (Resources.debugAvailableMoves)
		console.log(this.gameStatus.getAvailableMoves());

	overlay.update(this.gameStatus);
	this.notifyControllers();
}

Match.prototype.notifyControllers = function() {
	for (var i = 0; i < this.controllers.length; i++) {
		this.controllers[i].gameStatusChanged(this.gameStatus);
	}
};

Match.prototype.registerController = function(controller) {
	this.controllers.push(controller);	
	this.notifyControllers();
};
