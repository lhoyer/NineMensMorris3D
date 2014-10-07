//"use strict";

var view,mouse,tournament,startTime;

var init = function() {
	startTime = new Date().getTime();
	view = new View();

	start("cc");
};

var start = function() {
	//reset if neccessary
	if (tournament !== undefined) {
		tournament.cancel();
		view.resetGPs();
	}

	tournament = new Tournament(Settings.tournamentEstimators);
	if (Settings.mode==="t") {
		Settings.animate = false;
		Settings.enableView = false;

		console.log(Settings.tournamentEstimators);
		for (var i = 0; i < Settings.cores; i++)
			tournament.start(i);
	}
	else {
		Settings.animate = true;
		Settings.enableView = true;
		tournament.startHuman();
		mouse = new Mouse(tournament.matchWorker[0]);
	}
}

var changeMode = function() {
	var mode = document.getElementById("mode").options[document.getElementById("mode").selectedIndex].value;
	console.log("changeMode: " + mode);
	Settings.mode = mode;
	start();
}

var onMatchWorkerMessage = function(e) {
	var tag = e.data.tag;
	var msg = e.data.msg;

	if (Settings.enableView)
	{
		// Overlay
		if (tag === "help")
			overlay.help.textContent = msg;
		if (tag === "status")
			overlay.setStatus(msg);
		if (tag === "gamer")
			overlay.setGamer(msg);

		// 3D View
		if (tag === "move")
			view.updateGPPlace(msg);
		if (tag === "previewGPVisible")
			view.updatePreviewVisible(msg);
		if (tag === "previewGPPos")
			view.updatePreviewPosition(msg);
	}

	// Log
	if (tag === "log")
		console.log(msg);

	// End of game
	if (tag === "win" || tag === "draw" || tag === "loose")
		tournament.handleMatchEnd(tag,msg);
}

var render = function() {
	requestAnimationFrame(render);
	if (updateRender === true || new Date().getTime() < startTime + 10000) {
		view.renderer.render(view.scene, view.camera);
		updateRender = false;
	}
};


init();
render();