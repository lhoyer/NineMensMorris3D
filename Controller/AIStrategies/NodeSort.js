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

NodeSort.prototype.addNodeEvaluation = function(evaluation) {
	if (!Settings.presort)
		return;

	this.n.ev = evaluation;
	this.n.i = this.n.parent.currChild;
};

NodeSort.prototype.sortNodes = function() {
	if (!Settings.presort)
		return;
	this.n.parent.children.sort(function(a,b) {return b.ev - a.ev});
	// var sortArr = [];
	// for (var i = 0; i < this.n.children)
	// 	sortArr.push(this.n.children.i);
	// return sortArr;
}; 

NodeSort.prototype.sortedI = function(i) {
	if (!Settings.presort)
		return i;

	// if (this.nodeEvaluation[depth] === undefined ||
	// 	this.nodeEvaluation[depth][i] === undefined) {
	// 	console.warn("node undefined: " + depth + ", " + i);
	// 	return i;
	// }
	this.n = this.n.parent.children[i];
	return this.n.i;
};