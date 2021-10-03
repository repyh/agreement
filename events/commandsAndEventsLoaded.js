module.exports = {
	name: "commandsAndEventsLoaded",
	runOnce: true,
	call (_c, evt) {
		console.log(`Successfully loaded ${evt[0] === 0 ? "commands" : "events"}!`);
	}
};
