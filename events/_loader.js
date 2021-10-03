const { resolve } = require("path");
const { readdir } = require("fs").promises;
async function * getFiles(dir) { // recursively find all command files
	const dirents = await readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			yield * getFiles(res);
		} else {
			yield res;
		}
	}
}
async function load(client) {
	for await (const fn of getFiles("./events")) {
		if (fn.endsWith("_loader.js")) continue; // do not load command loader as command
		const event = require(fn);
		client.on(event.name, (...args) => {
			event.call(client, args);
		});
	}
}
module.exports = load;
