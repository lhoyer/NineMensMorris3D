
function Evolution (estCSet) {
	this.estCSet = estCSet;

	// this.childrenDistribution = [10,7,5,5,4,3,2,2,1,1];
	this.childrenDistribution = [10,10,7,7,5,5,5,5,4,4,3,3,2,2,2,2,1,1,1,1];

	this.mutationRate;
	this.mutationBoundaries;
	//...
}

Evolution.prototype.newGeneration = function() {
	var parents = [];
	var children = [];

	for (var i = 0; i < this.childrenDistribution.length; i++) {
		parents.push({c:this.estCSet[i],n:this.childrenDistribution[i]});
		//use crossover to copy parent and give him the right generation id
		children.push(this.crossover2P(parents[i].c,parents[i].c)[0]);
		children[children.length-1].parents = parents[i].c.id;
	}
	while(1) {
		var randomSet = [];
		for (var i = 0; i < parents.length; i++) {
			if (parents[i].n > 0)
				randomSet.push(parents[i]);
		}
		//if there is only one parent left, choose the other randomly
		if (randomSet.length === 1) {
			console.log("ups");
			randomSet.push(parents[Math.floor(Math.random()*parents.length)]);
		}
		if (randomSet.length === 0)
			break;

		var p1 = 0;
		var p2 = Math.floor((Math.random() * (randomSet.length-1))+1);

		var i = 0;
		var mut = false;
		do {
			var tmpC = this.crossover2P(randomSet[p1].c,randomSet[p2].c);
			if (i > 100) {
				tmpC[0] = this.mutation(tmpC[0]);
				tmpC[1] = this.mutation(tmpC[1]);
				mut = true;
			}
			i++;
		} while (this.containsEstimator(children,tmpC[0]) || this.containsEstimator(children,tmpC[1]))
		if (mut) console.log("mutation");

		children.push(tmpC[0]);
		children.push(tmpC[1]);
		randomSet[p1].n--;
		randomSet[p2].n--;
	}

	return children;
};

Evolution.prototype.crossover1P = function(p1,p2) {
	var c1 = new EstCoefficient();
	var c2 = new EstCoefficient();
	//crossover point between 1 and 17 -> minimum one coefficient from one parent
	var crossoverPoint = Math.floor(Math.random()*7)+1;

	for (var i = 0; i < 8; i++) {
		if (i < crossoverPoint) {
			this.copyCoefficient(p1,c1,i);
			this.copyCoefficient(p2,c2,i);
		}
		else {
			this.copyCoefficient(p2,c1,i);
			this.copyCoefficient(p1,c2,i);
		}
	}
	c1.id = "G" + (Generations.lastGeneration+1);
	c1.parents = p1.id + p2.id;
	c2.id = "G" + (Generations.lastGeneration+1);
	c2.parents = p2.id + p1.id;
	
	return [c1,c2];
};

Evolution.prototype.crossover2P = function(p1,p2) {
	var c1 = new EstCoefficient();
	var c2 = new EstCoefficient();
	//crossover point between 0 and 17 -> minimum one coefficient from one parent
	var crossoverPoint1 = Math.floor(Math.random()*8);
	do {
		var crossoverPoint2 = Math.floor(Math.random()*8);
	} while (crossoverPoint1 === crossoverPoint2)

	for (var i = 0; i < 8; i++) {
		// use <= and < so that i between 2 neighboured numbers contains one element
		if (crossoverPoint1 <= i && i < crossoverPoint2 ||
			crossoverPoint2 <= i && i < crossoverPoint1) {
			this.copyCoefficient(p1,c1,i);
			this.copyCoefficient(p2,c2,i);
		}
		else {
			this.copyCoefficient(p2,c1,i);
			this.copyCoefficient(p1,c2,i);
		}
	}
	c1.id = "G" + (Generations.lastGeneration+1);
	c1.parents = p1.id + p2.id;
	c2.id = "G" + (Generations.lastGeneration+1);
	c2.parents = p2.id + p1.id;

	return [c1,c2];
};

Evolution.prototype.mutation = function(m) {
	var rnd = new Generator().coefficientSet(1)[0];
	var mutPoint = Math.floor(Math.random()*18);
	this.copyCoefficient(rnd,m,mutPoint);
	return m;
};

Evolution.prototype.copyCoefficient = function(src,dest,idx) {
	dest.c[idx] = src.c[idx];
};

Evolution.prototype.containsEstimator = function(arr,est) {
	for (var arrI = 0; arrI < arr.length; arrI++) {
		var contains = true;
		for (var idx = 0; idx < 18; idx++) {
			if (arr[arrI].c[idx] !== est.c[idx]) contains = false;
		}
		if (contains === true)
			return true;
	}
	return false;
};