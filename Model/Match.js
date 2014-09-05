//class for combining game model with controllers
function Match() 
{
	this.game = new Game();
	this.controllers = new Array();
}

Match.prototype.doMove = function(move) {
	var success = this.game.doMove(move);
	if (success === false) {
		overlay.help.textContent = "Move isn't available";
		return;
	}
	else
		overlay.help.textContent = "";

	move.confirm();
	if (Resources.debugAvailableMoves)
		console.log(this.game.getAvailableMoves());

	overlay.update(this.game);
	render();
	var _this = this;
	// setTimeout( function() {_this.notifyControllers();}, 0);
	this.notifyControllers();
}

Match.prototype.notifyControllers = function() {
	console.debug("notifyControllers");
	for (var i = 0; i < this.controllers.length; i++) {
		this.controllers[i].gameChanged(this.game);
	}
};

Match.prototype.registerController = function(controller) {
	this.controllers.push(controller);	
	this.notifyControllers();
};
