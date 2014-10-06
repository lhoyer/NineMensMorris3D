//class for combining game model with controllers
function Match() 
{
	this.game = new Game();
	this.controllers = new Array();
	this.moveCnt = 0;
}

Match.prototype.start = function() {
	this.notifyControllers();
};

Match.prototype.doMove = function(move) {
	var success = this.game.doMove(move);
	var col;
	
	if (Settings.debugMiniMax)
		console.debug("Evaluation " + this.game.gamerColor + ": " + this.game.evaluation);

	move.confirm();
	if (Settings.debugAvailableMoves)
		console.log(this.game.getAvailableMoves());

	// UI Handling
	if (success === false)
		postMessage({tag:"help",msg:"Move isn't available"});
	else
		postMessage({tag:"help",msg:""});
	postMessage({tag:"gamer",msg:this.game.gamerColor});
	postMessage({tag:"status",msg:this.game.status});

	// Handle end of game
	if (match.game.status === "end" && match.game.gamerColor === "black") {
		postMessage({tag:"win",msg:[workerID,this.moveCnt]});
	}
	if (match.game.status === "end" && match.game.gamerColor === "white") {
		postMessage({tag:"loose",msg:[workerID,this.moveCnt]});
	}
	if (this.moveCnt++ > Settings.drawLimit) {
		self.postMessage({tag:"draw",msg:[workerID,this.moveCnt]});
	}

	var _this = this;
	if (Settings.mode !== "t")
		setTimeout( function() {_this.notifyControllers()}, Settings.changeDelay);
	else
		this.notifyControllers();
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
