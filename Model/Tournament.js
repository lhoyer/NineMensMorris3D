Tournament = function (estimatorCoefficientSet) {
	this.nextMatch = 0;
	this.matchWorker = [];
	this.matchTracker = [];
	this.moveCnt = [];

	if (estimatorCoefficientSet === undefined)
		return;

	this.estCSet = estimatorCoefficientSet;
	for (var i = 0; i < this.estCSet.length; i++) {
		this.estCSet[i].score = 0;
		this.estCSet[i].drawGpDiff = 0;
	}
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
	var gpDiff = msg[2];

	this.matchWorker[id].terminate();

	if (this.matchTracker[id] == undefined) {
		return;
	}

	if (result === "win")
		this.matchTracker[id][0].score += 3;
	if (result === "draw") {
		this.matchTracker[id][0].score += 1;
		this.matchTracker[id][1].score += 1;
		this.matchTracker[id][0].drawGpDiff += gpDiff;
		this.matchTracker[id][0].drawGpDiff -= gpDiff;
	}
	if (result === "loose")
		this.matchTracker[id][1].score += 3;
	this.moveCnt.push(moveCnt)
	

	if (Settings.debugMatchEnd)
		console.log(result + this.matchTracker[id][2] + ": " + 
			this.matchTracker[id][0].parents + " vs " + this.matchTracker[id][1].parents +
			"moves: " + moveCnt + "; gpDiff: " + gpDiff);

	this.start(id);
}

Tournament.prototype.start = function(i) {
	this.matchWorker[i] = new Worker("Model/MatchWorker.js");
	var nextMatch = this.getNextMatch();
	if (nextMatch === undefined)
		return;

	this.matchWorker[i].postMessage({tag:"settings",
							 msg: Settings});
	this.matchWorker[i].postMessage({tag:"controller1",
							 msg: nextMatch[0]});
	this.matchWorker[i].postMessage({tag:"controller2",
							 msg: nextMatch[1]});
	this.matchWorker[i].postMessage({tag:"start",msg:i});
	this.matchTracker[i] = [nextMatch[0],nextMatch[1],this.nextMatch-1];
	this.matchWorker[i].addEventListener('message', onMatchWorkerMessage, false);
}

Tournament.prototype.startHuman = function() {
	this.matchWorker[0] = new Worker("Model/MatchWorker.js");

	this.matchWorker[0].postMessage({tag:"settings",
						 msg: Settings});
	if (Settings.mode === "hh") {
		this.matchWorker[0].postMessage({tag:"controller1",
							 msg: "human"});
		this.matchWorker[0].postMessage({tag:"controller2",
							 msg: "human"});
	}
	else if (Settings.mode === "hc") {
		this.matchWorker[0].postMessage({tag:"controller1",
								 msg: "human"});
		this.matchWorker[0].postMessage({tag:"controller2",
								 msg: Settings.aiBlack});		
	}
	else if (Settings.mode === "ch") {
		this.matchWorker[0].postMessage({tag:"controller1",
								 msg: Settings.aiWhite});
		this.matchWorker[0].postMessage({tag:"controller2",
								 msg: "human"});
	}
	else if (Settings.mode === "cc") {
		Settings.animate = false;
		this.matchWorker[0].postMessage({tag:"controller1",
								 msg: Settings.aiWhite});
		this.matchWorker[0].postMessage({tag:"controller2",
								 msg: Settings.aiBlack});
	}
	else {
		console.warn("Tournament startHuman() Settings.mode invalid");
	}

	this.matchWorker[0].postMessage({tag:"start",msg:0});
	this.matchWorker[0].addEventListener('message', onMatchWorkerMessage, false);
}

Tournament.prototype.sort = function(rename) {
	if (rename === undefined) {
		console.warn("Tournament sort: parameter rename is undefined. Abort.");
		return;
	}
	this.estCSet.sort(function(a,b) {return b.score - a.score});
	if (rename === true) {
		for (var i = 0; i < this.estCSet.length; i++)
			this.estCSet[i].id = this.estCSet[i].id.substring(0,2) + 'E' + i;
	}
}

Tournament.prototype.toString = function() {
	this.sort();
	return JSON.stringify(this.estCSet);
}