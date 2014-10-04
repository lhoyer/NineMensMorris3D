GPModel.prototype = Object.create(Model.prototype);
GPModel.prototype.constructor = GPModel;

function GPModel(color,callback) {
	this.color = color;
	if (color == "white") {
	  	Model.call(this,Resources.gpWhiteModelName,callback);
  	}
  	else if (color == "black") {
	  	Model.call(this,Resources.gpBlackModelName,callback);
  	}
  	else
  		Model.call(this);
	
	this.setScale(new THREE.Vector3(2,2,2));
}

GPModel.prototype.clone = function() {
	var cloneContainer = new GPModel();
	cloneContainer = Model.prototype.clone.call(this,cloneContainer);
	cloneContainer.color = this.color;
	return cloneContainer;
}


GPModel.prototype.updatePlace = function(placeID) {
	if (placeID === "deleted") {
		this.animateDeletion(1);
		return;
	}

	this.placePos = Resources["place"+placeID];
	if (Resources.animate) {
		this.old = this.position.clone();
		var dx = this.placePos.x - this.position.x;
		var dy = this.placePos.y - this.position.y;
		var dz = this.placePos.z - this.position.z;
		this.animateMove(dx,dy,dz,1);
	}
	else
		this.setPosition(this.placePos);
}

GPModel.prototype.animateMove = function(dx,dy,dz,i) {
	var _this = this;
	var steps = 30;
	var sinH = Math.sin(i/steps * Math.PI);
	// var sinVel = Math.sin(i/steps * Math.PI);
	// var velMax = 10;

	// //scale height curve dependent on distance
	sinH *= Math.sqrt(dx*dx+dz*dz)/10;
	// sinVel *= velMax;
	var pos = new THREE.Vector3(i*dx/steps,i*dy/steps+sinH,i*dz/steps).add(this.old);
	this.setPosition(pos);

	if (i < steps) {
		setTimeout( function() {_this.animateMove(dx,dy,dz,i+1);}, 500/steps);
	}
	else {
		this.setPosition(this.placePos);
	}
};

GPModel.prototype.animateDeletion = function(i) {
	var _this = this;
	var steps = 30;
	var mat;
	if (this.color === "white")
		mat = this.material.materials[0];
	else
		mat = this.material.materials[1];

	mat.transparent = true;
	mat.opacity = 1 - i*1/30;

	if (i < steps) {
		updateRender = true;
		setTimeout( function() {_this.animateDeletion(i+1);}, 500/steps);
	}
	else {
		this.setVisible(false);
		mat.transparent = false;
		mat.opacity = 1;
		updateRender = true;
	}
};