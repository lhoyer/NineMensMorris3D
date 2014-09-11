function Model(file) {
	this.rotation = new THREE.Euler(0,0,0);
	this.position = new THREE.Vector3(0,0,0);
	this.scale = new THREE.Vector3(0,0,0);
	this.visible = true;

	var callbackThis = this;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
  	loader.load( file, function( collada ) {
		callbackThis.dae = collada.scene.clone();
		var skin = collada.skins[ 0 ];
		callbackThis.updateScale();
		callbackThis.updatePosition();
		callbackThis.updateRotation();
		callbackThis.updateVisible();
		//add to scene
		view.scene.add(callbackThis.dae);
		setTimeout( function() {updateRender = true}, 1000);
	});
}

Model.prototype.setVisible = function(visible) {
	this.visible = visible;
	if (this.dae != undefined)
		this.updateVisible();
};

Model.prototype.updateVisible = function() {
	if (this.dae.visible !== this.visible) {
		this.dae.visible = this.visible;
		updateRender = true;
	}
};

Model.prototype.setPosition = function(pos) {
	if (pos === null)
		return;
	this.position.set(pos.x,pos.y,pos.z);
	if (this.dae != undefined)
		this.updatePosition();
};

Model.prototype.updatePosition = function() {
	this.dae.position.x = this.position.x;
	this.dae.position.y = this.position.y;
	this.dae.position.z = this.position.z;
	if (this.visible)
		updateRender = true;
};

Model.prototype.setRotation = function(rot) {
	this.rotation.set(rot.x,rot.y,rot.z);
	if (this.dae != undefined)	
		this.updateRotation();
};

Model.prototype.updateRotation = function() {
	this.dae.rotation.x = this.rotation.x;
	this.dae.rotation.y = this.rotation.y;
	this.dae.rotation.z = this.rotation.z;
	if (this.visible)
		updateRender = true;
};

Model.prototype.setScale = function(scale) {
	this.scale.set(scale.x,scale.y,scale.z);
	if (this.dae != undefined)
		this.updateScale();
};

Model.prototype.updateScale = function() {
	this.dae.scale.x = this.scale.x;
	this.dae.scale.y = this.scale.y;
	this.dae.scale.z = this.scale.z;
	if (this.visible)
		updateRender = true;
};