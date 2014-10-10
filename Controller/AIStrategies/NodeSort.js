function Node(parent) {
	this.parent = parent;
	this.i;
	this.ev;
	this.children = [];
	this.currChild = 0;
}

function NodeSort() {
	this.root = new Node();
	this.n = this.root;
}

NodeSort.prototype.goDown = function() {
	if (!Settings.presort)
		return;
	if (this.n.children[this.n.currChild] === undefined)
		this.n.children[this.n.currChild] = new Node(this.n);
	this.n = this.n.children[this.n.currChild];
}

NodeSort.prototype.goUp = function() {
	if (!Settings.presort)
		return;
	this.n = this.n.parent;
};

NodeSort.prototype.next = function() {
	if (!Settings.presort)
		return;
	this.goUp();
	this.n.currChild++;
	this.goDown();
};

NodeSort.prototype.addNodeEvaluation = function(i,evaluation) {
	if (!Settings.presort)
		return;
	if (i !== this.n.parent.currChild)
		console.warn("i dosn't match currChild");

	this.n.ev = evaluation;
	this.n.i = this.n.parent.currChild;
};

NodeSort.prototype.sortNodes = function() {
	if (!Settings.presort)
		return;
	this.n.parent.children.sort(function(a,b) {return b.ev - a.ev});
	this.n.parent.currChild = 0;
	this.n = this.n.parent.children[0];
	// var sortArr = [];
	// for (var i = 0; i < this.n.children)
	// 	sortArr.push(this.n.children.i);
	// return sortArr;
}; 

NodeSort.prototype.sortedI = function(i) {
	if (!Settings.presort)
		return i;
	if (i !== this.n.parent.currChild)
		console.warn("i dosn't match currChild");
	if (i >= this.n.parent.children.length || this.n.parent.children[i].i === undefined) {
		// console.log("i >= parent.children.length");
		return i;
	}

	// this.n.parent.currChild = i;
	// this.n = this.n.parent.children[i];
	return this.n.i;
};