Human.prototype = Object.create(Controller.prototype);
Human.prototype.constructor = Human;

function Human(match,color)
{
	Controller.call(this,match,color);
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
	var status = this.game.status;
	if (status == "set") {
		var move = new MSet(place,this.color);
		match.doMove(move);
	}
	else if (status == "move") {
		if (this.oldPlace === undefined)
			return;
		var move = new MMove(this.oldPlace,place,this.color);
		match.doMove(move);
	}
	else if (status == "delete") {
		var move = new MDelete(place,this.color);
		match.doMove(move);
	}
	else if (status == "jump") {
		if (this.oldPlace === undefined)
			return;
		var move = new MJump(this.oldPlace,place,this.color);
		match.doMove(move);
	}
	else if (status == "delete") {
		//do nothing
	}
	else {
		console.warn("Human handleSelectedPlace: status unknown");
	}
};

//-------------------------------------------------------------------------------------------------
// helpers
//-------------------------------------------------------------------------------------------------
Human.prototype.placeFromPosition = function(position) {
	var pl = match.game.field.places;
	var limit = 5;
	for (var i = 0; i < pl.length; i++) {
		var plPos = Resources["place"+pl[i].id];
		if (position.x - limit < plPos.x && 
			plPos.x < position.x + limit && 
			position.z - limit < plPos.z && 
			plPos.z < position.z + limit) 
		{
			return pl[i];
		}
	}
};

Human.prototype.gameChanged = function(game) {
	this.game = game;
};

//-------------------------------------------------------------------------------------------------
// mouse movement
//-------------------------------------------------------------------------------------------------
Human.prototype.handleMouseUp = function(pos) {
	postMessage({
		tag:"previewGPVisible",
		msg:{
			color:this.color,
			visible:false
		}
	});
	if (this.game.gamerColor !== this.color)
		return false;

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

Human.prototype.handleMouseDown = function(pos) {
	if (this.game.gamerColor !== this.color)
		return false;
	if (this.game.status !== "move" && 
		this.game.status !== "jump")
		return false;

	this.oldPlace = this.placeFromPosition(pos);
	if (this.oldPlace === undefined)
		return; 
	var gp = this.oldPlace.gamingPiece;
	if (gp === undefined)
		return;

	if (gp.color === this.color) {
		postMessage({
			tag:"previewGPVisible",
			msg:{
				color:this.color,
				visible:true
			}
		});
		if (Resources.debugSelection) {
			console.log("Select place: " + this.oldPlace.toString());
		}
	}
}

Human.prototype.handleMouseMove = function(pos) {
	postMessage({
		tag:"previewGPPos",
		msg:{
			color:this.color,
			pos:pos
		}
	});
}