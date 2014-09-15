"use strict";

var view,mouse,referee;

var init = function() {
	view = new View();

	referee = new Referee(new Generator().coefficientSet(100));
	for (var i = 0; i < 8; i++)
		referee.start(i);

	mouse = new Mouse(referee.matchWorker[0]);
};

var onMatchWorkerMessage = function(e) {
	var tag = e.data.tag;
	var msg = e.data.msg;

	// // Overlay
	// if (tag === "help")
	// 	overlay.help.textContent = msg;
	// if (tag === "status")
	// 	overlay.setStatus(msg);
	// if (tag === "gamer")
	// 	overlay.setGamer(msg);

	// // 3D View
	// if (tag === "move")
	// 	view.updateGPPlace(msg);
	// if (tag === "previewGPVisible")
	// 	view.updatePreviewVisible(msg);
	// if (tag === "previewGPPos")
	// 	view.updatePreviewPosition(msg);

	// Log
	if (tag === "log")
		console.log(msg);

	// End of game
	if (tag === "win" || tag === "draw" || tag === "loose")
		referee.handleMatchEnd(tag,msg);
}

var render = function() {
	requestAnimationFrame(render);
	if (updateRender === true) {
		view.renderer.render(view.scene, view.camera);
		updateRender = false;
	}
};


init();
render();