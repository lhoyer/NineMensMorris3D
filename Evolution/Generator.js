function Generator() {
	this.csetRange = [
						[0,100],	// new morris
						[0,100],	// morris number
						[0,20],		// blocked GPs
						[0,100],	// gp number
						[0,100],	// closable morris
						[0,100],	// 3 piece constellation
						[0,100]];	// free connections

	this.cmoveRange = [[0,100]		// new morris
						[0,100],	// morris number
						[0,100],	// blocked GPs
						[0,100],	// gp number
						[0,100],	// closable morris number
						[0,100],	// double morris
						[0,20]];	// free connections

	this.cjumpRange = [[0,100],		// closable morris
						[0,100],	// 3 piece constellation
						[0,100]];	// new morris

	this.cwinRang = [[1000,3000]];
}

Generator.prototype.randomCoefficients = function() {
	var estCoefficient = new EstCoefficient();
	var c = [];

	for (var i = 0; i < this.csetRange.length; i++)
		c[i] = Math.floor((Math.random() * this.csetRange[i][1]-this.csetRange[i][0]) + this.csetRange[i][0]);
	estCoefficient.cset = c;

	c = [];
	for (var i = 0; i < this.cmoveRange.length; i++)
		c[i] = Math.floor((Math.random() * this.cmoveRange[i][1]-this.cmoveRange[i][0]) + this.cmoveRange[i][0]);
	estCoefficient.cmove = c;

	c = [];
	for (var i = 0; i < this.cjumpRange.length; i++)
		c[i] = Math.floor((Math.random() * this.cjumpRange[i][1]-this.cjumpRange[i][0]) + this.cjumpRange[i][0]);
	estCoefficient.cjump = c;

	estCoefficient.cwin = Math.floor((Math.random() * this.cwinRange[i][1]-this.cwinRange[i][0]) + this.cwinRange[i][0]);

	return estCoefficient;
};

Generator.prototype.estimatorSet = function(number) {
	var set = [];
	for (var i = 0; i < number; i++)
		set[i] = randomEstimator();
	return set;
};

