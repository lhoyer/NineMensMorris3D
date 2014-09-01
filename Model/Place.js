function Place(id) {
	this.id = id;

	//list connections
	this.connections = [];

	//list morris
	this.morris = [];

	//position
	this.position = Resources["place"+id];
}

Place.prototype.addConnection = function(connection) {
	//return if the connection already exists
	for (var i = 0; i < this.connections.length; i++) {
        if (this.connections[i] === connection) {
            return;
        }
    }
    //add bidirectional connection
	this.connections.push(connection);
	connection.connections.push(this);
}

Place.prototype.addMorrisConnection = function(morrisCon) {
	this.morris.push(morrisCon);
	morrisCon.morris.push(this);
}

Place.prototype.isSelected = function(pos,limit) {
	if (pos.x - limit < this.position.x && 
		this.position.x < pos.x + limit && 
		pos.z - limit < this.position.z && 
		this.position.z < pos.z + limit)
		return true;
	else
		return false;
}