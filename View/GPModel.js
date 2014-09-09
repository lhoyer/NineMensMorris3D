GPModel.prototype = Object.create(Model.prototype);
GPModel.prototype.constructor = GPModel;

function GPModel(color) {
	if (color == "white") {
	  	Model.call(this,Resources.gpWhiteModel);
  	}
  	else if (color == "black") {
	  	Model.call(this,Resources.gpBlackModel);
  	}
  	else
  		console.error("Try to create a GPModel. Color unknown.");
	
	this.setScale(2,2,2);
}


GPModel.prototype.assignPosFromPlace = function(placeID) {
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

GPModel.prototype.animate = function(dx,dy,dz,i) {
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