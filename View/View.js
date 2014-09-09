function View () {
	// Create a dov to contain everything
    var container = document.createElement('div');
    document.body.appendChild(container);

	//scene
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({antialias:true});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	//camera
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	this.camera.position.set(20,120,100);
  	this.scene.add(this.camera);
  	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	this.camera.lookAt(new THREE.Vector3(0,0,10));
  	this.controls.noRotate = true;
  	this.controls.noPan = true;

	//lighting
	this.initLighting();

	//axis
	this.addAxes();

	//window handlers
  	window.addEventListener('resize', this.onResizeWindow);	
}

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
    this.render();
};

View.prototype.render = function() {
	// requestAnimationFrame(render);
	this.renderer.render(this.scene, this.camera);
	// controls.update();
};
