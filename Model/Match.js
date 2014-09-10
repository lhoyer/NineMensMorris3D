//class for combining game model with controllers
function Match() 
{
	this.game = new Game();
	this.controllers = new Array();
}

Match.prototype.start = function() {
	this.notifyControllers();
};

Match.prototype.doMove = function(move) {
	var success = this.game.doMove(move);
	var col;
	console.debug("Evaluation " + this.game.gamerColor + ": " + this.game.evaluation);

	move.confirm();
	if (Resources.debugAvailableMoves)
		console.log(this.game.getAvailableMoves());

	// UI Handling
	if (success === false)
		postMessage({tag:"help",msg:"Move isn't available"});
	else
		postMessage({tag:"help",msg:""});
	postMessage({tag:"gamer",msg:this.game.gamerColor});
	postMessage({tag:"status",msg:this.game.status});

	this.notifyControllers();

	return success;
}

Match.prototype.notifyControllers = function() {
	for (var i = 0; i < this.controllers.length; i++) {
		if (this.controllers[i].gameChanged(this.game))
			break;
	}
};

Match.prototype.registerController = function(controller) {
	this.controllers.push(controller);	
};
