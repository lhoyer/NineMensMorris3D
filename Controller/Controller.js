function Controller(match,color)
{
	if (match != undefined && match instanceof Match)
		this.match = match;
	else
		console.error("Controller doesn't get a match.");
	if (match != undefined)
		this.color = color;
	else
		console.error("Controller doesn't get a color");
}

Controller.prototype.gameStatusChanged = function(game) {
	console.warn("Controller gameStatusChanged should be implemented by children");
};