var bestMove;
var standardDepth = 5;

importScripts("../../js/three.min.js");
importScripts("../../Model/Game.js");
importScripts("../../Model/Field.js");
importScripts("../../Model/GamingPiece.js");
importScripts("../../Model/Place.js");
importScripts("../../Model/Move.js");
importScripts("../../Model/MSet.js");
importScripts("../../Model/MMove.js");
importScripts("../../Model/MJump.js");
importScripts("../../Model/MDelete.js");
importScripts("../../View/Resources.js");



onmessage = function(e) {
  var raw = e.data;  
  var game = new Game(raw);
  miniMax(game,standardDepth);
  raw = bestMove.raw();
  postMessage(raw);
};


miniMax = function(game,depth) {
	var moves = game.getAvailableMoves();		
	var bestEvaluation = -100000;
	var ev;

	if (depth == 0 || moves.length == 0)
		return game.evaluate();

	for (var i = 0; i < moves.length; i++) {
		game.doMove(moves[i]);
		ev = - miniMax(game, depth - 1);
		game.undoLastMove();
		if (ev > bestEvaluation) {
			bestEvaluation = ev;
			if (depth == standardDepth) {
				bestMove = moves[i];
			}
		}
	}
	return bestEvaluation;
};