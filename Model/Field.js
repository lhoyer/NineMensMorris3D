function Field () 
{
	//load model
  	this.field = new Model(Resources.fieldModel);
  	this.field.setPosition(new THREE.Vector3(0,0,0));
  	this.field.setScale(new THREE.Vector3(15,15,15));

  	this.buildPlaces();
}

Field.prototype.buildPlaces = function() {

	this.places = new Array();

	var end = this.plIdx(2,3,1);
	for (var i = 0; i <= end; i++) {
		this.places[i] = new Place(this.idxToId(i));
	}

	for (l = 0; l < 3; l++) {
		for (i = 0; i < 4; i++) {
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