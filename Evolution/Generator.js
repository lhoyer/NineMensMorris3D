function Generator() {
	this.cRange = [ [50,100],		// gp number
				    [20,80],		// morris number
				    [10,60],		// new morris
					[10,60],		// closable morris
					[20,80],		// double morris
					[10,60],		// blocked GPS
					[0,20],			// free connections
					[1000,3000]];	// win
}

Generator.prototype.randomCoefficients = function() {
	var estCoefficient = new EstCoefficient();
	var c = [];

	for (var i = 0; i < this.cRange.length; i++)
		c[i] = Math.floor((Math.random() * (this.cRange[i][1]-this.cRange[i][0])) + this.cRange[i][0]);
	estCoefficient.c = c;

	return estCoefficient;
};

Generator.prototype.coefficientSet = function(number) {
	var set = [];
	for (var i = 0; i < number; i++)
		set[i] = this.randomCoefficients();
	return set;
};

