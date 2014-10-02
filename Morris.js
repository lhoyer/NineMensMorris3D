"use strict";

var view,mouse,tournament;

var init = function() {
	view = new View();

	var e = new Evolution();
	var c = new Generator().coefficientSet(2);
	e.crossover(c[0],c[1]);

	start("hc");
};

var start = function(mode) {
	//reset if neccessary
	if (tournament !== undefined) {
		tournament.cancel();
		view.resetGPs();
	}

	if (!Resources.human) {
		Resources.animate = false;
		Resources.enableView = false;

		// tournament = new Tournament(new Generator().coefficientSet(100));
		tournament = new Tournament([{cset:[96,5,17,1,48,19,37],cmove:[21,65,15,58,85,3,14],cjump:[33,5,25],cwin:[1851],score:333},{cset:[33,92,17,55,28,84,77],cmove:[86,83,20,90,13,91,3],cjump:[43,39,49],cwin:[2510],score:285},{cset:[13,55,17,11,51,73,64],cmove:[58,83,23,85,44,2,15],cjump:[83,38,96],cwin:[1645],score:279},{cset:[93,71,4,68,93,60,76],cmove:[3,75,67,83,18,64,4],cjump:[24,42,14],cwin:[2482],score:274},{cset:[54,88,1,57,58,75,89],cmove:[9,38,4,5,50,14,10],cjump:[96,76,36],cwin:[2135],score:272},{cset:[19,92,2,8,99,69,26],cmove:[37,16,21,91,88,40,3],cjump:[0,42,37],cwin:[1870],score:271},{cset:[25,38,17,91,89,82,85],cmove:[16,14,14,69,26,4,9],cjump:[84,15,36],cwin:[1898],score:270},{cset:[43,67,8,84,25,99,41],cmove:[18,93,6,59,28,11,15],cjump:[0,79,24],cwin:[1129],score:269},{cset:[82,31,4,95,25,78,77],cmove:[58,67,26,80,77,28,4],cjump:[52,36,34],cwin:[1537],score:269},{cset:[10,97,15,3,68,69,34],cmove:[89,93,48,10,36,22,15],cjump:[39,59,63],cwin:[2209],score:269},{cset:[2,19,7,5,45,29,40],cmove:[57,59,2,75,64,60,2],cjump:[22,71,38],cwin:[1802],score:269},{cset:[11,36,11,9,61,75,43],cmove:[22,72,9,41,32,9,1],cjump:[8,53,63],cwin:[2909],score:266},{cset:[39,93,16,27,64,95,55],cmove:[29,54,30,33,17,39,10],cjump:[68,16,79],cwin:[2333],score:252},{cset:[2,70,7,20,43,0,95],cmove:[21,10,30,73,21,35,2],cjump:[58,63,28],cwin:[1176],score:251},{cset:[47,89,19,39,38,82,92],cmove:[50,65,16,28,10,55,4],cjump:[43,82,65],cwin:[2200],score:251},{cset:[45,84,5,73,12,35,13],cmove:[0,51,95,66,43,52,11],cjump:[67,10,31],cwin:[2280],score:247},{cset:[32,90,18,48,95,28,28],cmove:[95,98,53,82,58,32,11],cjump:[9,92,57],cwin:[1322],score:242},{cset:[40,21,14,19,58,5,72],cmove:[7,24,64,86,22,35,10],cjump:[8,33,1],cwin:[955],score:240},{cset:[91,21,14,78,67,91,77],cmove:[10,44,15,1,89,31,16],cjump:[76,1,73],cwin:[1707],score:239},{cset:[76,56,17,73,29,47,98],cmove:[41,68,99,94,74,28,15],cjump:[22,35,4],cwin:[1330],score:237},{cset:[19,70,10,83,69,21,28],cmove:[37,79,69,46,68,46,17],cjump:[26,46,6],cwin:[1939],score:235},{cset:[88,96,13,60,16,60,49],cmove:[11,75,47,33,72,50,0],cjump:[47,68,8],cwin:[2874],score:232},{cset:[17,82,2,73,97,8,45],cmove:[20,38,23,75,63,4,5],cjump:[43,61,4],cwin:[653],score:230},{cset:[89,88,10,9,54,76,92],cmove:[47,87,74,75,22,47,14],cjump:[51,18,14],cwin:[2260],score:230},{cset:[78,54,18,90,41,24,83],cmove:[37,45,33,49,84,95,7],cjump:[39,35,18],cwin:[2309],score:230},{cset:[1,75,5,79,45,30,50],cmove:[39,10,48,99,25,41,16],cjump:[22,94,53],cwin:[1248],score:229},{cset:[93,22,3,45,8,96,10],cmove:[67,96,18,75,34,4,3],cjump:[31,83,33],cwin:[1486],score:229},{cset:[14,68,8,50,23,40,24],cmove:[84,83,13,10,53,54,9],cjump:[40,28,61],cwin:[2205],score:229},{cset:[43,66,14,40,24,13,59],cmove:[93,46,27,65,15,79,10],cjump:[73,68,16],cwin:[2849],score:229},{cset:[70,54,13,48,7,67,39],cmove:[33,86,33,51,1,70,8],cjump:[48,20,8],cwin:[1420],score:229},{cset:[43,44,10,18,21,37,22],cmove:[33,45,74,54,73,97,6],cjump:[30,77,68],cwin:[2608],score:228},{cset:[42,34,11,20,19,19,63],cmove:[19,73,30,40,68,98,17],cjump:[16,52,37],cwin:[2499],score:228},{cset:[5,18,6,62,84,75,38],cmove:[26,33,1,68,95,94,5],cjump:[18,68,34],cwin:[2773],score:227},{cset:[25,13,11,45,74,25,78],cmove:[3,50,76,36,57,36,2],cjump:[56,23,11],cwin:[2566],score:226},{cset:[53,55,12,5,15,94,37],cmove:[38,72,71,44,71,17,17],cjump:[95,24,69],cwin:[1141],score:224},{cset:[91,9,19,77,45,58,10],cmove:[11,21,10,49,28,84,9],cjump:[32,67,10],cwin:[2606],score:224},{cset:[36,96,9,26,84,73,88],cmove:[25,64,67,44,75,44,0],cjump:[94,24,36],cwin:[2442],score:222},{cset:[0,75,14,39,18,64,30],cmove:[47,37,53,22,96,79,19],cjump:[68,52,11],cwin:[2311],score:222},{cset:[1,64,11,29,11,65,66],cmove:[69,23,31,31,23,87,12],cjump:[38,34,3],cwin:[1476],score:218},{cset:[27,28,2,79,69,18,33],cmove:[5,75,99,90,82,38,1],cjump:[29,98,28],cwin:[2916],score:217},{cset:[77,47,8,79,91,12,97],cmove:[59,74,90,50,25,72,2],cjump:[78,32,35],cwin:[2382],score:216},{cset:[4,13,17,22,0,35,74],cmove:[46,75,55,97,63,3,13],cjump:[25,25,41],cwin:[639],score:214},{cset:[41,30,2,77,67,77,63],cmove:[79,78,98,55,61,62,15],cjump:[59,14,80],cwin:[2765],score:214},{cset:[66,68,18,23,3,88,66],cmove:[16,98,55,59,63,97,8],cjump:[25,91,30],cwin:[1877],score:213},{cset:[84,88,1,63,8,93,87],cmove:[24,93,81,51,62,74,2],cjump:[56,3,6],cwin:[2199],score:213},{cset:[29,79,18,12,77,24,8],cmove:[21,88,40,61,34,41,1],cjump:[61,19,13],cwin:[804],score:212},{cset:[33,87,8,68,94,25,47],cmove:[87,79,90,67,63,60,10],cjump:[44,21,41],cwin:[1613],score:212},{cset:[37,23,17,49,96,81,4],cmove:[79,56,35,72,27,14,17],cjump:[51,66,73],cwin:[1495],score:212},{cset:[24,99,1,93,56,34,28],cmove:[32,54,34,36,96,60,11],cjump:[4,98,44],cwin:[577],score:212},{cset:[83,0,4,65,8,33,35],cmove:[53,36,91,86,70,86,4],cjump:[47,62,11],cwin:[2893],score:211},{cset:[58,89,9,55,20,25,26],cmove:[60,33,66,20,38,83,6],cjump:[41,61,18],cwin:[2066],score:210},{cset:[63,17,7,23,51,22,49],cmove:[33,56,84,40,89,48,14],cjump:[49,64,82],cwin:[2910],score:210},{cset:[34,93,13,24,69,90,57],cmove:[75,69,12,41,32,29,1],cjump:[47,82,84],cwin:[798],score:291},{cset:[56,76,17,44,19,69,41],cmove:[75,37,11,85,34,8,8],cjump:[28,75,82],cwin:[1047],score:281},{cset:[85,4,2,71,49,32,65],cmove:[45,78,24,95,90,74,18],cjump:[42,75,31],cwin:[2254],score:280},{cset:[68,97,0,81,84,40,58],cmove:[49,83,3,21,47,8,4],cjump:[66,17,97],cwin:[2232],score:280},{cset:[15,30,18,56,38,25,99],cmove:[6,88,11,73,68,57,14],cjump:[31,40,44],cwin:[2898],score:265},{cset:[16,63,0,93,93,73,63],cmove:[40,59,20,43,61,38,8],cjump:[8,81,8],cwin:[1939],score:257},{cset:[48,18,15,30,38,25,88],cmove:[16,3,41,88,25,43,9],cjump:[92,76,38],cwin:[2683],score:253},{cset:[81,46,18,0,24,60,63],cmove:[11,42,44,85,50,23,17],cjump:[29,67,92],cwin:[2433],score:252},{cset:[87,1,15,77,27,1,35],cmove:[4,14,28,35,97,35,18],cjump:[58,91,79],cwin:[1864],score:250},{cset:[31,10,10,9,85,4,12],cmove:[34,64,24,38,90,73,18],cjump:[86,36,30],cwin:[2880],score:246},{cset:[77,47,1,15,8,86,50],cmove:[90,88,20,97,1,65,14],cjump:[28,22,55],cwin:[2178],score:244},{cset:[82,34,3,67,73,62,90],cmove:[50,47,4,36,27,54,14],cjump:[78,11,97],cwin:[1402],score:243},{cset:[87,72,12,6,69,79,78],cmove:[14,13,26,56,9,49,1],cjump:[80,88,80],cwin:[1106],score:241},{cset:[24,20,11,7,29,99,27],cmove:[58,58,1,5,54,16,11],cjump:[0,1,0],cwin:[733],score:241},{cset:[98,54,12,90,97,54,55],cmove:[40,36,16,17,91,56,15],cjump:[87,75,16],cwin:[1390],score:239},{cset:[43,50,7,2,39,40,99],cmove:[2,91,93,66,79,35,7],cjump:[81,79,82],cwin:[1470],score:239},{cset:[38,72,17,16,49,95,29],cmove:[38,20,37,24,22,77,17],cjump:[98,93,92],cwin:[2646],score:238},{cset:[2,2,1,50,77,77,70],cmove:[39,16,58,27,73,47,0],cjump:[24,78,4],cwin:[2932],score:236},{cset:[23,93,17,32,50,64,35],cmove:[92,0,4,14,93,48,15],cjump:[75,37,88],cwin:[2649],score:235},{cset:[22,73,6,64,17,41,39],cmove:[86,19,40,39,96,38,13],cjump:[36,40,3],cwin:[2836],score:235},{cset:[45,53,5,99,66,53,31],cmove:[68,21,17,19,61,59,17],cjump:[9,35,4],cwin:[2112],score:235},{cset:[48,50,2,98,42,0,70],cmove:[10,30,27,45,78,79,13],cjump:[55,13,69],cwin:[1766],score:232},{cset:[23,75,2,94,47,22,87],cmove:[83,59,41,41,96,30,15],cjump:[30,37,14],cwin:[1487],score:232},{cset:[14,94,1,61,24,27,42],cmove:[80,63,72,51,95,33,15],cjump:[13,49,4],cwin:[1379],score:231},{cset:[29,86,4,6,32,10,13],cmove:[59,8,42,41,34,38,7],cjump:[2,32,15],cwin:[1009],score:230},{cset:[4,82,12,35,22,26,75],cmove:[10,61,4,27,60,85,4],cjump:[92,74,0],cwin:[1943],score:228},{cset:[78,83,12,7,31,34,43],cmove:[55,74,67,81,71,5,18],cjump:[97,49,82],cwin:[1207],score:228},{cset:[21,92,10,74,24,32,69],cmove:[41,78,87,98,68,12,3],cjump:[5,36,62],cwin:[1594],score:227},{cset:[58,74,3,14,77,89,39],cmove:[64,77,25,35,58,67,1],cjump:[54,13,25],cwin:[1079],score:225},{cset:[27,97,4,49,76,50,30],cmove:[98,25,12,23,85,80,4],cjump:[80,51,4],cwin:[1841],score:224},{cset:[53,10,7,91,12,69,84],cmove:[92,35,81,1,14,30,0],cjump:[20,32,9],cwin:[1675],score:224},{cset:[35,93,8,39,66,44,82],cmove:[78,8,17,15,5,25,11],cjump:[59,37,83],cwin:[2688],score:221},{cset:[9,66,17,2,79,3,80],cmove:[40,53,63,74,9,52,15],cjump:[16,70,93],cwin:[1069],score:221},{cset:[3,54,13,80,42,52,44],cmove:[61,22,59,22,84,81,18],cjump:[12,70,53],cwin:[1603],score:220},{cset:[89,2,8,33,65,10,13],cmove:[67,0,84,86,94,73,12],cjump:[4,70,90],cwin:[1427],score:217},{cset:[7,78,14,20,33,58,66],cmove:[8,60,66,13,50,18,14],cjump:[65,74,94],cwin:[1483],score:216},{cset:[71,28,11,6,9,12,91],cmove:[38,59,69,23,93,33,0],cjump:[11,48,30],cwin:[821],score:215},{cset:[30,32,11,8,26,52,30],cmove:[10,47,11,97,54,26,13],cjump:[70,97,32],cwin:[726],score:215},{cset:[0,67,15,80,87,27,23],cmove:[3,19,77,52,31,34,10],cjump:[56,92,17],cwin:[899],score:214},{cset:[93,47,13,18,65,88,29],cmove:[0,27,60,82,88,89,12],cjump:[28,0,38],cwin:[1335],score:212},{cset:[99,3,8,21,46,34,51],cmove:[5,82,51,31,71,81,16],cjump:[19,43,47],cwin:[2514],score:211},{cset:[4,42,3,66,73,31,31],cmove:[71,75,42,49,80,86,9],cjump:[40,62,32],cwin:[1710],score:211},{cset:[31,11,3,44,91,80,97],cmove:[76,42,10,17,78,78,3],cjump:[15,30,43],cwin:[2603],score:211},{cset:[32,51,6,73,41,21,33],cmove:[70,35,61,54,73,81,11],cjump:[64,23,27],cwin:[1947],score:211},{cset:[74,68,3,19,66,90,73],cmove:[46,10,93,73,83,87,7],cjump:[46,28,56],cwin:[1216],score:210}]);
		for (var i = 0; i < 8; i++)
			tournament.start(i);
	}
	else {
		tournament = new Tournament(new Generator().coefficientSet(1));
		Resources.animate = true;
		Resources.enableView = true;
		tournament.startHuman(mode);
		mouse = new Mouse(tournament.matchWorker[0]);
	}
}

var changeMode = function() {
	var mode = document.getElementById("mode").options[document.getElementById("mode").selectedIndex].value;
	console.log("changeMode: " + mode);
	start(mode);
}

var onMatchWorkerMessage = function(e) {
	var tag = e.data.tag;
	var msg = e.data.msg;

	if (Resources.enableView)
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
	if (updateRender === true) {
		view.renderer.render(view.scene, view.camera);
		updateRender = false;
	}
};


init();
render();