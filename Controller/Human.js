Human.prototype = Object.create(Controller.prototype);
Human.prototype.constructor = Human;

function Human(match)
{
	Controller.call(this,match);
	var callbackThis = this;

	(function() {
    window.onclick = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseMove(event);
    }
	})();
}

Controller.prototype.selectPlace = function(position) {
	var pl = match.field.places;
	for (var i = 0; i < pl.length; i++) {
		if (pl[i].isSelected(position,2)) {
			if (Resources.debugSelection) {
				console.log("Select place: " + pl[i].id);
				for (var j = 0; j < pl[i].connections.length; j++)
					console.log("Connections: " + pl[i].connections[j].id);
			}
		}
	}
}

Controller.prototype.handleMouseMove = function(event) {
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