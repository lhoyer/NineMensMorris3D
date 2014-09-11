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
	
	this.setScale(new THREE.Vector3(2,2,2));
}


GPModel.prototype.updatePlace = function(placeID) {
	if (placeID === "deleted") {
		this.setVisible(false);
		return;
	}

	this.placePos = Resources["place"+placeID];
	// var dx = this.placePos.x - this.position.x;
	// var dy = this.placePos.y - this.position.y;
	// var dz = this.placePos.z - this.position.z;
	// this.animate(dx,dy,dz,1);
	this.setPosition(this.placePos);
}

GPModel.prototype.animate = function(dx,dy,dz,i) {
	var gThis = this;
	var steps = 30;
	var sinH = - Math.sin((i-1)/steps * Math.PI) + Math.sin(i/steps * Math.PI);
	var sinVel = Math.sin(i/steps * Math.PI);
	var velMax = 10;

	//scale height curve dependent on distance
	sinH *= Math.sqrt(dx*dx+dz*dz)/10;
	sinVel *= velMax;
	var v = new THREE.Vector3(dx/steps,dy/steps+sinH,dz/steps);

	this.position.add(v);
	this.updatePosition();

	if (i < steps) {
		setTimeout( function() {gThis.animate(dx,dy,dz,i+1);}, 500/steps);
	}
	else {
		this.setPosition(this.placePos);
	}
};