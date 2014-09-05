"use strict";

var scene, camera, renderer, controls;
var match,controller1, controller2;

var init = function() {
	// Create a dov to contain everything
    var container = document.createElement('div');
    document.body.appendChild(container);
    

    // Give this example a title
    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Just a box';
    container.appendChild(info);

	//scene
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(20,120,100);
  	scene.add(camera);
  	controls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.lookAt(new THREE.Vector3(0,0,10));
  	controls.noRotate = true;
  	controls.noPan = true;

  	match = new Match();
  	controller1 = new Human(match,"white");
  	// controller2 = new Human(match,"black");
  	controller2 = new AI(match,"black",new MinMaxAI());
  	match.registerController(controller1);
  	match.registerController(controller2);

	//lighting
	initLighting();

	//axis
	addAxes();

	//window handlers
  	window.addEventListener('resize', onResizeWindow);		

};

var initLighting = function() {
	var light = new THREE.PointLight(0xfffff3, 0.9);
  	light.position.set(-100,200,100);
    scene.add(light);

	var sphereSize = 1; 
	var pointLightHelper = new THREE.PointLightHelper( light, sphereSize ); 
	scene.add( pointLightHelper );

    var light2 = new THREE.PointLight(0xd7f0ff, 0.3);
    light2.position.set(200,200,100);
    scene.add(light2);

	var sphereSize = 1; 
	var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize ); 
	scene.add( pointLightHelper2 );

	var light3 = new THREE.PointLight(0xFFFFFF, 0.6);
    light3.position.set(150,200,-100);
    scene.add(light3);

	var sphereSize = 1; 
	var pointLightHelper3 = new THREE.PointLightHelper( light3, sphereSize ); 
	scene.add( pointLightHelper3 );
}

var addAxes = function() {
	var axes = new THREE.AxisHelper(50);
	// axes.position = dae.position;
	scene.add(axes);

	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0xFFC0CB), new THREE.Color(0x8f8f8f) );
	gridXZ.position.set(0,0,0 );
	scene.add(gridXZ);
}

var onResizeWindow = function() {
	console.log("Resize window");
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
};

var render = function () {
	// requestAnimationFrame(render);
	renderer.render(scene, camera);
	// controls.update();
};

init();
render();