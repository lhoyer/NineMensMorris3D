"use strict";

var view,matchWorker,mouse;

var init = function() {
	view = new View();
	matchWorker = new Worker("MatchWorker.js");
	mouse = new Mouse(matchWorker);

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