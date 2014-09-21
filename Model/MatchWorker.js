importScripts("../js/three.min.js");
importScripts("../Controller/Controller.js");
importScripts("../Controller/AI.js");
importScripts("../Controller/AIStrategies/AIStrategy.js");
importScripts("../Controller/AIStrategies/AlphaBetaAI.js");
importScripts("../Controller/AIStrategies/MinMaxAI.js");
importScripts("../Controller/Human.js");
importScripts("Match.js");
importScripts("Game.js");
importScripts("Estimator.js");
importScripts("EstCoefficient.js")
importScripts("Field.js");
importScripts("GamingPiece.js");
importScripts("Place.js");
importScripts("Move.js");
importScripts("MSet.js");
importScripts("MMove.js");
importScripts("MJump.js");
importScripts("MDelete.js");
importScripts("../View/Resources.js");

var workerID = 0;
var match = new Match();
var controller1, controller2;

onmessage = function(e) {
	var tag = e.data.tag;
	var msg = e.data.msg;

	if (tag === "controller1") {
		if (msg === "human")
			controller1 = new Human(match,"white");
		else {
			controller1 = new AI(match,"white",new AlphaBetaAI(match.game));
			controller1.strategy.estimator.c = msg;
		}
		match.registerController(controller1);
	}

	if (tag === "controller2") {
		if (msg === "human")
			controller2 = new Human(match,"black");
		else {
			controller2 = new AI(match,"black",new AlphaBetaAI(match.game));
			controller2.strategy.estimator.c = msg;
		}
		match.registerController(controller2);
	}

	if (tag === "start") {
		workerID = msg;
		match.start();
	}

	if (tag === "mouseUp") {
		if (controller1.handleMouseUp !== undefined)
			controller1.handleMouseUp(msg);
		if (controller2.handleMouseUp !== undefined)
			controller2.handleMouseUp(msg);
	}
	if (tag === "mouseDown") {
		if (controller1.handleMouseDown !== undefined)
			controller1.handleMouseDown(msg);
		if (controller2.handleMouseDown !== undefined)
			controller2.handleMouseDown(msg);
	}
	if (tag === "mouseMove") {
		if (controller1.handleMouseMove !== undefined)
			controller1.handleMouseMove(msg);
		if (controller2.handleMouseMove !== undefined)
			controller2.handleMouseMove(msg);
	}
	if (tag === "goOn") {
		match.notifyControllers();
	}
};