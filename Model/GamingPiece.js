// data: normal mode color of gp; raw mode raw object
// game: only use this parameter in raw mode
function GamingPiece(data, game) {
	this.color;
	this.place;
	this.gpModel;

	if (data === undefined)
		return;

	// create from raw object 
	if (data !== undefined && data.plId !== undefined && game !== undefined)
	{
		this.color = data.color;
		if (data.plId === "new" || data.plId === "deleted")
			this.place = data.plId;
		else {
			var pl = game.field.places[game.field.plIdx(data.plId[0],data.plId[1],data.plId[2])];
			this.place = pl;
			pl.gamingPiece = this;
		}
	}
	else
	{
		this.color = data;

		//load model
		//the model is only the representation and can differ from the position of the place
		//call assignPosFromPlace to sync them
		if (this.color == "white")
	  		this.gpModel = new Model(Resources.gpWhiteModel);
	  	else if (this.color == "black")
	  		this.gpModel = new Model(Resources.gpBlackModel);
	  	else
	  		console.error("Try to create a GamingPiece. Color unknown.");

	  	this.gpModel.setPosition(new THREE.Vector3(0,-10000,0));
	  	this.gpModel.setScale(new THREE.Vector3(2,2,2));
	}
}

GamingPiece.prototype.assignPosFromPlace = function() {
	if (this.place === "deleted") {
		this.gpModel.setVisible(false);
		return;
	}

	if (this.place !== undefined) {
		// this.gpModel.setPosition(this.place.position);
		var dx = this.place.position.x - this.gpModel.position.x;
		var dy = this.place.position.y - this.gpModel.position.y;
		var dz = this.place.position.z - this.gpModel.position.z;
		this.animate(dx,dy,dz,1);
	}
	else
		console.error("Try to assign GamingPiece position from place. Place undefined.");
}

GamingPiece.prototype.animate = function(dx,dy,dz,i) {
	var gThis = this;
	var steps = 100;
	var sinH = - Math.sin((i-1)/steps * Math.PI) + Math.sin(i/steps * Math.PI);
	var sinVel = Math.sin(i/steps * Math.PI);
	var velMax = 10;

	//scale height curve dependent on distance
	sinH *= Math.sqrt(dx*dx+dz*dz)/10;
	sinVel *= velMax;
	var v = new THREE.Vector3(dx/steps,dy/steps+sinH,dz/steps);

	this.gpModel.position.add(v);
	this.gpModel.updatePosition();

	if (this.place.position.distanceTo(this.gpModel.position)>0.1) {
		setTimeout( function() {gThis.animate(dx,dy,dz,i+1);}, velMax-sinVel);
	}
};

GamingPiece.prototype.raw = function() {
	var raw = new Object();
	raw.color = this.color;
	if (this.place === "new" || this.place === "deleted")
		raw.plId = this.place;
	else
		raw.plId = this.place.id;
	return raw;
};