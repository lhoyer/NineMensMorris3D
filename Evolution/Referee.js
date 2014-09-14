Referee = function (estimatorCoefficientSet) {
	this.estCSet = estimatorCoefficientSet;
	this.nextMatch = 0;
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
};

Referee.prototype.recordScore = function(estC1,estC2,result) {
	if (result === "win")
		estC1.score += 3;
	if (result === "draw") {
		estC1.score += 1;
	}
	if (result === "loose")
		estC2.score += 3;
}