function Place(id) {
	this.id = id;

	this.gamingPiece = undefined;

	//list connections
	this.connections = [];

	//list of morrises in which contain the place
	//one item contains array of 3 places
	this.morrises = [];

	//position
	this.position = Resources["place"+id];
}

Place.prototype.addConnection = function(connection) {
	//return if the connection already exists
	if (this.connections.indexOf(connection) !== -1){
        return;
    }
    //add bidirectional connection
	this.connections.push(connection);
	connection.connections.push(this);
}

Place.prototype.addMorris = function(morris) {
	//return if the morris already exists
	if (this.morrises.indexOf(morris) !== -1) {
        return;
    }
	this.morrises.push(morris);
}

Place.prototype.isConnected = function(place2) {
	for (var i = 0; i < this.connections.length; i++)
		if (this.connections[i] === place2)
			return true;
	return false;
};

Place.prototype.isSelected = function(pos,limit) {
	if (pos.x - limit < this.position.x && 
		this.position.x < pos.x + limit && 
		pos.z - limit < this.position.z && 
		this.position.z < pos.z + limit)
		return true;
	else
		return false;
}

Place.prototype.toString = function() {
	var str;
	str = this.id + "\n"
	str += "Connections: ";
	for (var j = 0; j < this.connections.length; j++) {
		str += this.connections[j].id + "; ";
	}
	str += "\n";
	for (var j = 0; j < this.morrises.length; j++) {
		str += "Morris " + j + ": ";
		str += this.morrises[j][0].id + "; ";
		str += this.morrises[j][1].id + "; ";
		str += this.morrises[j][2].id + "\n";
	}
	return str;
}