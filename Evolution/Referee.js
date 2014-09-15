Referee = function (estimatorCoefficientSet) {
	this.estCSet = estimatorCoefficientSet;
	this.nextMatch = 0;

	this.matchWorker = [];
	this.matchTracker = [];
}

Referee.prototype.getNextMatch = function() {
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

Referee.prototype.handleMatchEnd = function(result,id) {
	if (result === "win")
		this.matchTracker[id][0].score += 3;
	if (result === "draw") {
		this.matchTracker[id][0].score += 1;
		this.matchTracker[id][1].score += 1;
	}
	if (result === "loose")
		this.matchTracker[id][1].score += 3;

	if (Resources.debugMatchEnd)
		console.log(result + ": " + this.matchTracker[id][2]);

	this.matchWorker[id].terminate();
	this.start(id);
}

Referee.prototype.start = function(i) {
	this.matchWorker[i] = new Worker("MatchWorker.js");
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

Referee.prototype.sort = function() {
	this.estCSet.sort(function(a,b) {return b.score - a.score});
}

Referee.prototype.toString = function() {
	var s = JSON.stringify(this.estCSet);
	s.replace(/"/g,"");
	return s;
}