Tournament = function (estimatorCoefficientSet) {
	this.nextMatch = 0;
	this.matchWorker = [];
	this.matchTracker = [];
	this.moveCnt = [];

	if (estimatorCoefficientSet === undefined)
		return;

	this.estCSet = estimatorCoefficientSet;
	for (var i = 0; i < this.estCSet.length; i++)
		this.estCSet[i].score = 0;
}

Tournament.prototype.cancel = function() {
	for (var i = 0; i < this.matchWorker.length; i++)
		this.matchWorker[i].terminate();
};

Tournament.prototype.getNextMatch = function() {
	var cnt = 0;
	for (var i = 0; i < this.estCSet.length; i++) {
		for (var j = 0; j < this.estCSet.length; j++) {
			// the same estimators don't play against each other
			if (i === j)
				continue;
			if (cnt == this.nextMatch) {
				this.nextMatch++;
				return [this.estCSet[i],this.estCSet[j]];
			}
			cnt++;
		}
	}
	return undefined;
};

Tournament.prototype.handleMatchEnd = function(result,msg) {
	var id = msg[0];
	var moveCnt = msg[1];

	this.matchWorker[id].terminate();

	if (this.matchTracker[id] == undefined) {
		return;
	}

	if (result === "win")
		this.matchTracker[id][0].score += 3;
	if (result === "draw") {
		this.matchTracker[id][0].score += 1;
		this.matchTracker[id][1].score += 1;
	}
	if (result === "loose")
		this.matchTracker[id][1].score += 3;
	this.moveCnt.push(moveCnt)
	

	if (Resources.debugMatchEnd)
		console.log(result + " in " + moveCnt + " moves: " + this.matchTracker[id][2]);

	this.start(id);
}

Tournament.prototype.start = function(i) {
	this.matchWorker[i] = new Worker("Model/MatchWorker.js");
	var nextMatch = this.getNextMatch();
	if (nextMatch === undefined)
		return;

	this.matchWorker[i].postMessage({tag:"controller1",
							 msg: nextMatch[0]});
	this.matchWorker[i].postMessage({tag:"controller2",
							 msg: nextMatch[1]});
	this.matchWorker[i].postMessage({tag:"start",msg:i});
	this.matchTracker[i] = [nextMatch[0],nextMatch[1],this.nextMatch-1];
	this.matchWorker[i].addEventListener('message', onMatchWorkerMessage, false);
}

Tournament.prototype.startHuman = function(mode) {
	var est1 = {cset:[33,92,17,55,28,84,77],cmove:[86,83,20,90,13,91,3],cjump:[43,39,49],cwin:[2510],score:285};
	var est2 = {cset:[96,5,17,1,48,19,37],cmove:[21,65,15,58,85,3,14],cjump:[33,5,25],cwin:[1851],score:333};

	this.matchWorker[0] = new Worker("Model/MatchWorker.js");

	if (mode === "hh") {
		this.matchWorker[0].postMessage({tag:"controller1",
							 msg: "human"});
		this.matchWorker[0].postMessage({tag:"controller2",
							 msg: "human"});
	}
	else if (mode === "hc") {
		this.matchWorker[0].postMessage({tag:"controller1",
								 msg: "human"});
		this.matchWorker[0].postMessage({tag:"controller2",
								 msg: est2});		
	}
	else if (mode === "ch") {
		this.matchWorker[0].postMessage({tag:"controller1",
								 msg: est1});
		this.matchWorker[0].postMessage({tag:"controller2",
								 msg: "human"});
	}
	else {
		console.warn("Tournament startHuman() get no parameter");
	}

	this.matchWorker[0].postMessage({tag:"start",msg:0});
	this.matchWorker[0].addEventListener('message', onMatchWorkerMessage, false);
}

Tournament.prototype.sort = function() {
	this.estCSet.sort(function(a,b) {return b.score - a.score});
	for (var i = 0; i < this.estCSet.length; i++)
		this.estCSet[i].id = 'E' + i;
}