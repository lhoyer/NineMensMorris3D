importScripts("js/three.min.js");
importScripts("Controller/Controller.js");
importScripts("Controller/AI.js");
importScripts("Controller/AIStrategies/AIStrategy.js");
importScripts("Controller/AIStrategies/AlphaBetaAI.js");
importScripts("Controller/AIStrategies/MinMaxAI.js");
importScripts("Controller/Human.js");
importScripts("Model/Match.js");
importScripts("Model/Game.js");
importScripts("Model/Estimator.js");
importScripts("Model/Field.js");
importScripts("Model/GamingPiece.js");
importScripts("Model/Place.js");
importScripts("Model/Move.js");
importScripts("Model/MSet.js");
importScripts("Model/MMove.js");
importScripts("Model/MJump.js");
importScripts("Model/MDelete.js");
importScripts("View/Resources.js");

var match = new Match();
// controller1 = new Human(match,"white");
// controller2 = new Human(match,"black");
var controller1 = new AI(match,"white",new AlphaBetaAI());
var controller2 = new AI(match,"black",new AlphaBetaAI());

match.registerController(controller1);
match.registerController(controller2);
match.start();

onmessage = function(e) {
	var tag = e.data.tag;
	var msg = e.data.msg;

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