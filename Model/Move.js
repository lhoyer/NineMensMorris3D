function Move () {
}

Move.prototype.apply = function(game,confirm) {
	console.warn("Move apply: Do nothing: Children should implement this method.");
};

Move.prototype.available = function(game) {
	console.warn("Move available: Do nothing: Children should implement this method.");
};