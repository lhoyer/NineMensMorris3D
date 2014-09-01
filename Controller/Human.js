Human.prototype = Object.create(Controller.prototype);
Human.prototype.constructor = Human;

function Human(match,color)
{
	Controller.call(this,match,color);
	var callbackThis = this;

	(function() {
    window.onclick = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseMove(event);
    }
	})();
}

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
	// TODO: switch betwen SET,MOVE,DELETE
	var status = "SET";

	if (status == "SET")
	{
		var move = new MSet(place,this.color);
		match.doMove(move,true);
	}

};

Human.prototype.handleMouseMove = function(event) {
	var xOff = 0;
	var yOff = -20;
	var projector = new THREE.Projector();
	var planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2.6);
	var mouse3D = new THREE.Vector3( ( (event.clientX+xOff) / window.innerWidth ) * 2 - 1,   		//x
                                    -( (event.clientY+yOff) / window.innerHeight ) * 2 + 1,  		//y
                                    0.5 );                                            				//z
    var raycaster = projector.pickingRay( mouse3D.clone(), camera );
    var pos = raycaster.ray.intersectPlane(planeZ);

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
}