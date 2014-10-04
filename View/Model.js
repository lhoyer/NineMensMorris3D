function Model(file,callback) {
	this.rotation = new THREE.Euler(0,0,0);
	this.position = new THREE.Vector3(0,0,0);
	this.scale = new THREE.Vector3(0,0,0);
	this.visible = true;
	this.dae;

	if (file === undefined)
		return;

	var _this = this;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
  	loader.load( file, function( collada ) {
  		_this.sceneProto = collada.scene;
		_this.dae = collada.scene.clone();
		_this.material = _this.dae.children[0].children[0].material;
		_this.updateScale();
		_this.updatePosition();
		_this.updateRotation();
		_this.updateVisible();
		//add to scene
		view.scene.add(_this.dae);
		if (callback !== undefined)
			callback();
		setTimeout( function() {updateRender = true}, 0);
	});
}

//use clone container to define model type which is returned (e.g. GPModel)
Model.prototype.clone = function(cloneContainer) {
	if (cloneContainer === undefined)
		cloneContainer = new Model();

	//clone model and material
	cloneContainer.dae = this.sceneProto.clone();
	cloneContainer.dae.children[0].children[0].material = cloneContainer.dae.children[0].children[0].material.clone();
	cloneContainer.material = cloneContainer.dae.children[0].children[0].material;

	//clone custom transformation
	cloneContainer.setRotation(this.rotation);
	cloneContainer.setPosition(this.position);
	cloneContainer.setScale(this.scale);
	cloneContainer.setVisible(this.visible);

	//updat render
	view.scene.add(cloneContainer.dae);
	updateRender = true;

	return cloneContainer;
};

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