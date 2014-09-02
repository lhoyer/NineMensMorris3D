Human.prototype = Object.create(Controller.prototype);
Human.prototype.constructor = Human;

function Human(match,color)
{
	Controller.call(this,match,color);
	mouse.addListener(this);
	this.previewGP = new GamingPiece(color);
	this.previewGP.gpModel.setVisible(false);
	this.move;
}

//-------------------------------------------------------------------------------------------------
// place selection
//-------------------------------------------------------------------------------------------------
Human.prototype.selectPlace = function(position) {
	var pl = match.field.places;
	var place;
	//get place from position
	for (var i = 0; i < pl.length; i++) {
		if (pl[i].isSelected(position,5)) {
			if (Resources.debugSelection) {
				console.log("Select place: " + pl[i].toString());
			}
			place = pl[i];
			this.handleSelectedPlace(place);
			break;
		}
	}
}

Human.prototype.handleSelectedPlace = function(place) {
	var status = this.gameStatus.status;
	if (status == "set") {
		this.move = new MSet(place,this.color);
		match.doMove(this.move,true);
	}
	if (status == "move") {

	}
	if (status == "delete") {

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
	if (this.gameStatus.gamerColor !== this.color ||
		this.gameStatus.status !== "move")
		return false;

	this.previewGP.gpModel.dae.visible = true;
	//this.move = new MMove();
}

Human.prototype.handleMouseMove = function(event) {
	if (this.previewGP !== undefined)
		this.previewGP.gpModel.setPosition(this.mouseCoordinate(event));
}

Human.prototype.mouseCoordinate = function(event) {
	var xOff = 0;
	var yOff = -20;
	var projector = new THREE.Projector();
	var planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2.6);
	var mouse3D = new THREE.Vector3( ( (event.clientX+xOff) / window.innerWidth ) * 2 - 1,   		//x
                                    -( (event.clientY+yOff) / window.innerHeight ) * 2 + 1,  		//y
                                    0.5 );                                            				//z
    var raycaster = projector.pickingRay( mouse3D.clone(), camera );
    var pos = raycaster.ray.intersectPlane(planeZ);
    return pos;
};