const { resolve } = require("path");
const { readdir } = require("fs").promises;
const { Collection } = require("discord.js");
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
async function load(collection) {
	for await (const fn of getFiles("./commands")) {
		if (fn.endsWith("_loader.js")) continue; // do not load command loader as command
		const command = require(fn);
		if (!command.category) {
			console.error(new TypeError(`Command ${fn} does not have a category.`));
			process.exit(1);
		}
		if (collection.has(command.category)) {
			collection.get(command.category).set(command.name, command);
		} else {
			collection.set(command.category, new Collection().set(command.name, command));
		}
	}
}
module.exports = load;