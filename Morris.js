"use strict";

var view,match,controller1,controller2;

var init = function() {
	view = new View();
  	match = new Match();
  	controller1 = new Human(match,"white");
  	// controller2 = new Human(match,"black");
  	// controller1 = new AI(match,"white",new AlphaBetaAI());
  	controller2 = new AI(match,"black",new AlphaBetaAI());
  	match.registerController(controller1);
  	match.registerController(controller2);
  	match.start();

};


init();
// render();