"use strict";

var view,matchWorker,controller1,controller2;

var init = function() {
	view = new View();

	matchWorker = new Worker("MatchWorker.js");

	matchWorker.onmessage = function(e) {
		var tag = e.data.tag;
		var msg = e.data.msg;

		if (tag === "help")
			overlay.help.textContent = msg;
		if (tag === "status")
			overlay.setStatus(msg);
		if (tag === "gamer")
			overlay.setGamer(msg);
		if (tag === "move")
			view.updateGPPlace(msg);
		// overlay.update();
	};
};


init();