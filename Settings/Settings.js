var Settings = new Settings();

function Settings(){
	// catch the case that Generations doesn't exists in match worker environment
	if (typeof Generations !== 'undefined') {
		// this.aiWhite = Generations["G"+Generations.lastGeneration][0];
		// this.aiBlack = Generations["G"+Generations.lastGeneration][0];
		this.aiWhite = Generations["cG1"][0];
		this.aiBlack = Generations["cG1"][0];

		if (Generations.lastGeneration === 0)
			this.tournamentEstimators = new Generator().coefficientSet(100);
		else
			this.tournamentEstimators = new Evolution(Generations["cG"+Generations.lastGeneration]).newGeneration();
		// this.tournamentEstimators = Generations["aG4"];
	}

	this.mode = "hc";
	this.drawLimit = 150;
	this.cores = 5;

	this.aiRandom = true;
	this.aiIterative = false;
	if (this.aiIterative)
		this.aiDepth = 25;
	else
		this.aiDepth = 4;
	this.aiIterativeMaxTime = 2000;

	this.changeDelay = 100;	
	this.enableView = true;
	this.animate = true;

	this.debugSelection = false;
	this.debugAvailableMoves = false;
	this.debugMiniMax = false;
	this.logTime = false;
	this.debugMatchEnd = true;
}