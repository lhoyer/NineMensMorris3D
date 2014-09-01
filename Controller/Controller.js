function Controller(match)
{
	if (match != undefined && match instanceof Match)
		this.match = match;
	else
		console.error("Controller doesn't get a match.");
}