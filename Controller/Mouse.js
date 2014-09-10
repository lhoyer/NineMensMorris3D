function Mouse (worker) {
	this.worker = worker;

	var callbackThis = this;
	(function() {
    window.onmouseup = handleMouseUp;
    function handleMouseUp(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseUp(event);
    }
	})();
	(function() {
    window.onmousedown = handleMouseDown;
    function handleMouseDown(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseDown(event);
    }
	})();
	(function() {
    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseMove(event);
    }
	})();
}

Mouse.prototype.handleMouseUp = function(event) {
	this.worker.postMessage({
		tag:"mouseUp",
		msg:this.projectMouse(event)
		});
}
Mouse.prototype.handleMouseDown = function(event) {
	this.worker.postMessage({
		tag:"mouseDown",
		msg:this.projectMouse(event)
		});
}
Mouse.prototype.handleMouseMove = function(event) {
	this.worker.postMessage({
		tag:"mouseMove",
		msg:this.projectMouse(event)
		});
}

Mouse.prototype.projectMouse = function(event) {
	var xOff = 0;
	var yOff = 0;
	var projector = new THREE.Projector();
	var planeZ = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2.6);
	var mouse3D = new THREE.Vector3( ( (event.clientX+xOff) / window.innerWidth ) * 2 - 1,   		//x
                                    -( (event.clientY+yOff) / window.innerHeight ) * 2 + 1,  		//y
                                    0.5 );                                            				//z
    var raycaster = projector.pickingRay( mouse3D.clone(), view.camera );
    var pos = raycaster.ray.intersectPlane(planeZ);
    return pos;
}