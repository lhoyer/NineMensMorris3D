var Settings = new Settings();

function Settings(){
	// catch the case that Generations doesn't exists in match worker environment
	if (typeof Generations !== 'undefined') {
		// this.aiWhite = Generations["G"+Generations.lastGeneration][0];
		// this.aiBlack = Generations["G"+Generations.lastGeneration][0];
		this.aiWhite = Generations["aG4"][0];
		this.aiBlack = Generations["aG4"][0];

		this.tournamentEstimators = new Evolution(Generations["rG"+Generations.lastGeneration]).newGeneration();
		// this.tournamentEstimators = new Generator().coefficientSet(100);
		// this.tournamentEstimators = Generations["aG4"];
	}

	this.mode="hc";
	this.drawLimit=250;
	this.cores=4;

	this.aiDepth=5;
	this.aiRandom=true;
	this.aiIterative=false;

	this.changeDelay=100;	
	this.enableView=true;
	this.animate=true;

	this.debugSelection=false;
	this.debugAvailableMoves=false;
	this.debugMiniMax=false;
	this.logTime=false;
	this.debugMatchEnd=true;
}