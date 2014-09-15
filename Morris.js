"use strict";

var view,matchWorker,mouse,referee;

var init = function() {
	view = new View();
	matchWorker = new Worker("MatchWorker.js");
	mouse = new Mouse(matchWorker);

	referee = new Referee(new Generator().coefficientSet(10));
	var nextMatch = referee.getNextMatch();
	matchWorker.postMessage({tag:"controller1",
							 msg: nextMatch[0]});
	matchWorker.postMessage({tag:"controller2",
							 msg: nextMatch[1]});
	matchWorker.postMessage({tag:"start",msg:""});

	matchWorker.onmessage = function(e) {
		var tag = e.data.tag;
		var msg = e.data.msg;

		if (tag === "help")
			overlay.help.textContent = msg;
		if (tag === "status")
			overlay.setStatus(msg);
		if (tag === "gamer")
			overlay.setGamer(msg);
		if (tag === "move") {
			view.updateGPPlace(msg);
		}
		if (tag === "previewGPVisible")
			view.updatePreviewVisible(msg);
		if (tag === "previewGPPos")
			view.updatePreviewPosition(msg);
		if (tag === "log")
			console.log(msg);
	};
};

var render = function() {
	requestAnimationFrame(render);
	if (updateRender === true) {
		view.renderer.render(view.scene, view.camera);
		updateRender = false;
	}
};


init();
render();