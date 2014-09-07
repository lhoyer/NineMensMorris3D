//class for combining game model with controllers
function Match(c1,c2) 
{
	this.game = new Game();
	this.controllers = new Array();
}

Match.prototype.start = function() {
	var pl,m;

	// pl = this.game.field.places[this.game.field.plIdx(0,0,0)];
	// m = new MSet(pl,"white")
	// this.game.doMove(m);
	// m.confirm();

	// pl = this.game.field.places[this.game.field.plIdx(1,0,0)];
	// m = new MSet(pl,"black")
	// this.game.doMove(m);
	// m.confirm();

	// pl = this.game.field.places[this.game.field.plIdx(0,2,0)];
	// m = new MSet(pl,"white")
	// this.game.doMove(m);
	// m.confirm();

	// pl = this.game.field.places[this.game.field.plIdx(1,0,1)];
	// m = new MSet(pl,"black")
	// this.game.doMove(m);
	// m.confirm();


	this.notifyControllers();
};

Match.prototype.doMove = function(move) {
	var success = this.game.doMove(move);
	var col;
	if (this.game.status === "delete")
		col = this.game.gamerColor;
	else
		col = this.game.gamerColor==="white"?"black":"white";
	console.debug("Evaluation " + col + ": " + this.game.evaluation);

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
	
	setTimeout( function() {_this.notifyControllers();}, 100);
	//this.notifyControllers();
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
