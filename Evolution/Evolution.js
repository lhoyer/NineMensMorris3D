
function Evolution (estCSet) {
	this.estCSet = estCSet;
}

Evolution.prototype.crossover = function(p1,p2) {
	var c = new EstCoefficient();
	//crossover point between 1 and 17 -> minimum one coefficient from one parent
	var crossoverPoint = Math.floor(Math.random()*17)+1;

	for (var i = 0; i < 7; i++) {
		if (i < crossoverPoint)
			c.cset[i] = p1.cset[i];
		else
			c.cset[i] = p2.cset[i];
	}
	for (var i = 0; i < 7; i++) {
		if (i+7 < crossoverPoint)
			c.cmove[i] = p1.cmove[i];
		else
			c.cmove[i] = p2.cmove[i];
	}
	for (var i = 0; i < 3; i++) {
		if (i+14 < crossoverPoint)
			c.cjump[i] = p1.cjump[i];
		else
			c.cjump[i] = p2.cjump[i];
	}
	for (var i = 0; i < 1; i++) {
		if (i+17 < crossoverPoint)
			c.cwin[i] = p1.cwin[i];
		else
			c.cwin[i] = p2.cwin[i];
	}
	
	return c;
};