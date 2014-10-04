var updateRender = false;

function View () {
	// Create a dov to contain everything
    var container = document.createElement('div');
    document.body.appendChild(container);

	//scene
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({antialias:true});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	//Field
	this.createField();
	this.createGPs();
	this.createPreviewGPs();

	//camera
	this.initCamera();

	//lighting
	this.initLighting();

	//axis
	this.addAxes();

	//window handlers
	var _this = this;
  	window.addEventListener('resize', function(){_this.onResizeWindow()});	
}

//-------------------------------------------------------------------------------------------------
// Game elements
//-------------------------------------------------------------------------------------------------
View.prototype.createGPs = function() {
	this.gps = [];
	this.gpWhiteProto = new GPModel("white",this.whiteProtoCallback);
	this.gpWhiteProto.setVisible("false");
	this.gpBlackProto = new GPModel("black",this.blackProtoCallback);
};

View.prototype.whiteProtoCallback = function() {
	var gp;
	for (var i = 0; i < 9; i++)
	{
  		gp = view.gpWhiteProto.clone();
	  	gp.setPosition(new THREE.Vector3(-80,0,i*10-45));
	  	gp.setVisible(true);
	  	view.gps[i] = gp;
  	}
};

View.prototype.blackProtoCallback = function() {
	var gp;
	for (var i = 0; i < 9; i++)
	{
  		gp = view.gpBlackProto.clone();
	  	gp.setPosition(new THREE.Vector3(80,0,i*10-45));
	  	gp.setVisible(true);
	  	view.gps[i+9] = gp;
  	}
};

View.prototype.resetGPs = function() {
	for (var i = 0; i < 9; i++)
		this.gps[i].setPosition(new THREE.Vector3(-80,0,i*10-45));
	for (var i = 0; i < 9; i++)
		this.gps[i+9].setPosition(new THREE.Vector3(80,0,i*10-45));
	for (var i = 0; i < 18; i++)
		this.gps[i].setVisible(true);
}

View.prototype.createPreviewGPs = function() {
	this.previewWhite = new GPModel("white");
	this.previewWhite.setVisible(false);
	this.previewBlack = new GPModel("black");
	this.previewBlack.setVisible(false);
};

View.prototype.createField = function() {
	this.field = new Model(Resources.fieldModel);
  	this.field.setPosition(new THREE.Vector3(0,0,0));
  	this.field.setScale(new THREE.Vector3(15,15,15));
};

View.prototype.updateGPPlace = function(msg) {
	var gp = this.gps[msg.gp];
	gp.updatePlace(msg.pl);
};

View.prototype.updatePreviewVisible = function(msg) {
	var gp;
	if (msg.color === "white")
		gp = this.previewWhite;
	else
		gp = this.previewBlack
	gp.setVisible(msg.visible);		
};

View.prototype.updatePreviewPosition = function(msg) {
	var gp;
	if (msg.color === "white")
		gp = this.previewWhite;
	else
		gp = this.previewBlack
	gp.setPosition(msg.pos);		
};

//-------------------------------------------------------------------------------------------------
// Scene initialization
//-------------------------------------------------------------------------------------------------
View.prototype.initLighting = function() {
	var light = new THREE.PointLight(0xfffff3, 0.9);
  	light.position.set(-100,200,100);
    this.scene.add(light);

	var sphereSize = 1; 
	var pointLightHelper = new THREE.PointLightHelper( light, sphereSize ); 
	this.scene.add( pointLightHelper );

    var light2 = new THREE.PointLight(0xd7f0ff, 0.3);
    light2.position.set(200,200,100);
    this.scene.add(light2);

	var sphereSize = 1; 
	var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize ); 
	this.scene.add( pointLightHelper2 );

	var light3 = new THREE.PointLight(0xFFFFFF, 0.6);
    light3.position.set(150,200,-100);
    this.scene.add(light3);

	var sphereSize = 1; 
	var pointLightHelper3 = new THREE.PointLightHelper( light3, sphereSize ); 
	this.scene.add( pointLightHelper3 );
}

View.prototype.initCamera = function() {
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	this.camera.position.set(20,120,100);
  	this.scene.add(this.camera);
  	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	this.camera.lookAt(new THREE.Vector3(0,0,10));
  	this.controls.noRotate = true;
  	this.controls.noPan = true;
};

View.prototype.addAxes = function() {
	var axes = new THREE.AxisHelper(50);
	// axes.position = dae.position;
	this.scene.add(axes);

	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0xFFC0CB), new THREE.Color(0x8f8f8f) );
	gridXZ.position.set(0,0,0 );
	this.scene.add(gridXZ);
}

View.prototype.onResizeWindow = function() {
	console.log("Resize window");
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.aspect = WIDTH / HEIGHT;
    this.camera.updateProjectionMatrix();
    updateRender = true;
};
