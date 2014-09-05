function Field (raw) 
{
	if (raw === false || raw === undefined) {
		//load model
	  	this.field = new Model(Resources.fieldModel);
	  	this.field.setPosition(new THREE.Vector3(0,0,0));
	  	this.field.setScale(new THREE.Vector3(15,15,15));
  	}

  	this.buildPlaces();
}

Field.prototype.buildPlaces = function() {
	this.places = new Array();
	this.morrises = new Array();

	// build places with their position
	var end = this.plIdx(2,3,1);
	for (var i = 0; i <= end; i++) {
		this.places[i] = new Place(this.idxToId(i));
	}

	// add connections
	for (var l = 0; l < 3; l++) {
		for (var i = 0; i < 4; i++) {
			//connections within level
			this.places[this.plIdx(l,i,1)].addConnection(this.places[this.plIdx(l,i,0)]);
			this.places[this.plIdx(l,i,1)].addConnection(this.places[this.plIdx(l,(i==3)?0:(i+1),0)]);
			//connections betwen levels
			if (l < 2)
				this.places[this.plIdx(l,i,1)].addConnection(this.places[this.plIdx(l+1,i,1)]);
			if (l > 0)
				this.places[this.plIdx(l,i,1)].addConnection(this.places[this.plIdx(l-1,i,1)]);
		}
	}

	//add morris
	for (var l = 0; l < 3; l++) {
		for (var i = 0; i < 4; i++) {
			//morris within level
			var pl1 = this.places[this.plIdx(l,i,0)];
			var pl2 = this.places[this.plIdx(l,i,1)]; 
			var pl3 = this.places[this.plIdx(l,(i==3)?0:(i+1),0)];
			this.setupMorris(pl1,pl2,pl3);
		}
	}
	for (var i = 0; i < 4; i++) {
		//morris betwen levels
		var pl1 = this.places[this.plIdx(0,i,1)];
		var pl2 = this.places[this.plIdx(1,i,1)];
		var pl3 = this.places[this.plIdx(2,i,1)];
		this.setupMorris(pl1,pl2,pl3);
	}
}

Field.prototype.setupMorris = function(pl1,pl2,pl3) {
	if ((pl1 instanceof Place) && (pl2 instanceof Place) && (pl3 instanceof Place)) {
		this.morrises.push([pl1,pl2,pl3]);
		pl1.addMorris(this.morrises[this.morrises.length-1]);
		pl2.addMorris(this.morrises[this.morrises.length-1]);
		pl3.addMorris(this.morrises[this.morrises.length-1]);
	}
	else
		console.error("setupMorris: parameters aren't Places");
}

Field.prototype.plIdx = function(lv,si,po) {
	var idx = -1;
	for (var i = 0; i < 3; i++)
		for (var j = 0; j < 4; j++)
			for (var k = 0; k < 2; k++) {
				idx++;
				if (i == lv && j == si && k == po)
					return idx;
			}	
}

Field.prototype.idxToId = function(idx) {
	var cnt = -1;
	for (var i = 0; i < 3; i++)
		for (var j = 0; j < 4; j++)
			for (var k = 0; k < 2; k++) {
				cnt++;
				if (cnt==idx)
					return "" + i + j + k;
	}	
}