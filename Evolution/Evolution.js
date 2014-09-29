
function Evolution (estCSet) {
	this.estCSet = estCSet;
}

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