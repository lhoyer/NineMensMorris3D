var mouse = new Mouse();

function Mouse () {
	this.listeners = new Array();

	var callbackThis = this;
	(function() {
    window.onmouseup = handleMouseUp;
    function handleMouseUp(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseUp(event);
    }
	})();
	(function() {
    window.onmousedown = handleMouseDown;
    function handleMouseDown(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseDown(event);
    }
	})();
	(function() {
    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        callbackThis.handleMouseMove(event);
    }
	})();
}

Mouse.prototype.addListener = function(listener) {
	this.listeners.push(listener);
};

Mouse.prototype.handleMouseUp = function(event) {
	for (var i = 0; i < this.listeners.length; i++)
		if (this.listeners[i].handleMouseUp(event))
			return;
}
Mouse.prototype.handleMouseDown = function(event) {
	for (var i = 0; i < this.listeners.length; i++)
		if (this.listeners[i].handleMouseDown(event))
			return;
}
Mouse.prototype.handleMouseMove = function(event) {
	for (var i = 0; i < this.listeners.length; i++)
		if (this.listeners[i].handleMouseMove(event))
			return;
}