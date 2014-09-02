var mouse = new Mouse();

function Mouse () {
	this.listeners = new Array();

	var callbackThis = this;
	(function() {
    window.onclick = handleMouseClick;
    function handleMouseClick(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseClick(event);
    }
	})();
}

Mouse.prototype.addListener = function(listener) {
	this.listeners.push(listener);
};

Mouse.prototype.handleMouseClick = function(event) {
	for (var i = 0; i < this.listeners.length; i++)
		if (this.listeners[i].handleMouseClick(event))
			return;
}