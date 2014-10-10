var Settings = new Settings();

function Settings(){
	// catch the case that Generations doesn't exists in match worker environment
	if (typeof Generations !== 'undefined') {
		// this.aiWhite = Generations["G"+Generations.lastGeneration][0];
		// this.aiBlack = Generations["G"+Generations.lastGeneration][0];
		this.aiWhite = Generations["aG4"][0];
		this.aiBlack = Generations["aG4"][0];

		this.tournamentEstimators = new Evolution(Generations["G"+Generations.lastGeneration]).newGeneration();
		// this.tournamentEstimators = new Generator().coefficientSet(100);
		// this.tournamentEstimators = Generations["G3"];
	}

	this.mode="hc";
	this.drawLimit=100;
	this.cores=6;

	this.changeDelay=100;
	this.aiDepth=7;
	this.aiIterative=true;
	this.aiRandom=false;
	this.enableView=true;
	this.animate=true;

	this.debugSelection=false;
	this.debugAvailableMoves=false;
	this.debugMiniMax=false;
	this.logTime=true;
	this.debugMatchEnd=true
}