var overlay = new Overlay();

function Overlay () {
	this.gamer = document.getElementById("gamer");
	this.status = document.getElementById("status");
	this.help = document.getElementById("help");
}

Overlay.prototype.setStatus = function(status) {
	switch (status) {
		case "set":
			this.status.textContent = "Set Gaming Piece";
			break;
		case "move":
			this.status.textContent = "Move Gaming Piece";
			break;
		case "delete":
			this.status.textContent = "Delete Gaming Piece";
			break;
		case "jump":
			this.status.textContent = "Jump Gaming Piece";
			break;
		case "end":
			this.status.textContent = "Game Over";
			break;
		default:
			console.warn("Overlay setStatus: unknown status");
	}
};

Overlay.prototype.setGamer = function(gamer) {
	switch (gamer) {
		case "white":
			this.gamer.textContent = "Gamer 1 (White)";
			break;
		case "black":
			this.gamer.textContent = "Gamer 2 (Black)";
			break;
		default:
			console.warn("Overlay setGamer: unknown gamer");
	}
};

Overlay.prototype.update = function(game) {
	this.setGamer(game.gamerColor);
	this.setStatus(game.status);
};
