Human.prototype = Object.create(Controller.prototype);
Human.prototype.constructor = Human;

function Human(match,color)
{
	Controller.call(this,match,color);
	mouse.addListener(this);
	this.previewGP = new GamingPiece(color);
	this.previewGP.gpModel.setVisible(false);
	this.oldPlace;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
Human.prototype.selectPlace = function(position) {
	var place;
	place = this.placeFromPosition(position);
	if (place === undefined)
		return;
	if (Resources.debugSelection) {
		console.log("Select place: " + place.toString());
	}
	this.handleSelectedPlace(place);
}

Human.prototype.handleSelectedPlace = function(place) {
	var status = this.gameStatus.status;
	if (status == "set") {
		var move = new MSet(place,this.color);
		match.doMove(move);
	}
	if (status == "move") {
		if (this.oldPlace === undefined)
			return;
		var move = new MMove(this.oldPlace,place,this.color);
		match.doMove(move);
	}
	if (status == "delete") {
		var move = new MDelete(place,this.color);
		match.doMove(move);
	}
	if (status == "jump") {
		if (this.oldPlace === undefined)
			return;
		var move = new MJump(this.oldPlace,place,this.color);
		match.doMove(move);
	}
};

//-------------------------------------------------------------------------------------------------
// helpers
//-------------------------------------------------------------------------------------------------
Human.prototype.placeFromPosition = function(position) {
	var pl = match.field.places;
	for (var i = 0; i < pl.length; i++) {
		if (pl[i].isSelected(position,5))
			return pl[i];
	}
};

Human.prototype.gameStatusChanged = function(game) {
	this.gameStatus = game;
};

//-------------------------------------------------------------------------------------------------
// mouse movement
//-------------------------------------------------------------------------------------------------
Human.prototype.handleMouseUp = function(event) {
	this.previewGP.gpModel.dae.visible = false;
	if (this.gameStatus.gamerColor !== this.color)
		return false;

	var pos = this.mouseCoordinate(event);

    if (Resources.debugSelection) {
	    console.log(pos);
	    var geometry = new THREE.BoxGeometry(.2,.2,.2);
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
		cube.position.x = pos.x;
		cube.position.y = pos.y;
		cube.position.z = pos.z;
		scene.add(cube);
	}

	this.selectPlace(pos);
	return true;
}

Human.prototype.handleMouseDown = function(event) {
	if (this.gameStatus.gamerColor !== this.color)
		return false;
	if (this.gameStatus.status !== "move" && 
		this.gameStatus.status !== "jump")
		return false;

	this.oldPlace = this.placeFromPosition(this.mouseCoordinate(event));
	if (this.oldPlace === undefined)
		return; 
	var gp = this.match.gameStatus.getGPFromPlace(this.oldPlace)
	if (gp === undefined)
		return;

	if (gp.color === this.color) {
		this.previewGP.gpModel.dae.visible = true;
		if (Resources.debugSelection) {
			console.log("Select place: " + this.oldPlace.toString());
		}
	}
}

Human.prototype.handleMouseMove = function(event) {
	if (this.previewGP !== undefined)
		this.previewGP.gpModel.setPosition(this.mouseCoordinate(event));
}

Human.prototype.mouseCoordinate = function(event) {
	var xOff = 0;
	var yOff = 0;
	var projector = new THREE.Projector();
	var planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2.6);
	var mouse3D = new THREE.Vector3( ( (event.clientX+xOff) / window.innerWidth ) * 2 - 1,   		//x
                                    -( (event.clientY+yOff) / window.innerHeight ) * 2 + 1,  		//y
                                    0.5 );                                            				//z
    var raycaster = projector.pickingRay( mouse3D.clone(), camera );
    var pos = raycaster.ray.intersectPlane(planeZ);
    return pos;
}