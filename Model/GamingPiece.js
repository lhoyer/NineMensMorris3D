function GamingPiece(color) {
	this.color;
	this.place;
	this.gpModel;

	if (color === undefined)
		return;

	this.color = color;

	//load model
	//the model is only the representation and can differ from the position of the place
	//call assignPosFromPlace to sync them
	if (color == "white")
  		this.gpModel = new Model(Resources.gpWhiteModel);
  	else if (color == "black")
  		this.gpModel = new Model(Resources.gpBlackModel);
  	else
  		console.error("Try to create a GamingPiece. Color unknown.");

  	this.gpModel.setPosition(new THREE.Vector3(0,-10000,0));
  	this.gpModel.setScale(new THREE.Vector3(2,2,2));
}

GamingPiece.prototype.setPlace = function(place) {
	this.place = place;
}

GamingPiece.prototype.assignPosFromPlace = function() {
	if (this.place != undefined)
		this.gpModel.setPosition(this.place.position);
	else
		console.error("Try to assign GamingPiece position from place. Place undefined.");
}

//create a new GamingPiece with the properties of this
//keep model and place as references
GamingPiece.prototype.clone = function() {
	var gp = new GamingPiece();

	gp.color = this.color;
	gp.gpModel = this.gpModel;
	gp.place = this.place;

	return gp;
}