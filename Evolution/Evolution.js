
function Evolution (estCSet) {
	this.estCSet = estCSet;
}

Evolution.prototype.newGeneration = function() {
	var parents = [];
	var childrenNumber = [10,7,5,5,4,3,2,2,1,1];
	var children = [];

	for (var i = 0; i < 10; i++) {
		parents[i] = this.estCSet[i];
		children.push(parents[i]);
		children[children.length-1].parents = parents[i].id;
	}

	for (var i = 0; i < parents.length; i++) {
		for (var j = 0; j < childrenNumber[i]; j++) {
			var p1 = i;
			do {
				var p2 = Math.floor(Math.random() * parents.length)
			} while (p1 === p2)
			children.push(this.crossover(parents[p1],parents[p2]));
		}
	}

	return children;
};

Evolution.prototype.crossover = function(p1,p2) {
	var c = new EstCoefficient();
	//crossover point between 1 and 17 -> minimum one coefficient from one parent
	var crossoverPoint = Math.floor(Math.random()*17)+1;

	for (var i = 0; i < 18; i++) {
		if (i < crossoverPoint)
			this.copyCoefficient(p1,c,i);
		else
			this.copyCoefficient(p2,c,i);
	}
	c.parents = p1.id + p2.id;
	
	return c;
};

Evolution.prototype.copyCoefficient = function(src,dest,idx) {
	if (idx < 7)
		dest.cset[idx] = src.cset[idx];
	else if (idx < 14)
		dest.cmove[idx-7] = src.cmove[idx-7];
	else if (idx < 17)
		dest.cjump[idx-14] = src.cjump[idx-14];
	else
		dest.cwin[0] = src.cwin[0];
};