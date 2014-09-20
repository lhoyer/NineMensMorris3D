
function Evolution (estCSet) {
	this.estCSet = estCSet;
	this.sort();
	for (var i = 0; i < this.estCSet.length; i++)
		this.estCSet[i].id = 'E' + i;
}

Evolution.prototype.crossover = function(p1,p2) {
	// body...
};

Evolution.prototype.sort = function() {
	this.estCSet.sort(function(a,b) {return b.score - a.score});
}