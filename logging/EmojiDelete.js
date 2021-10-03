const { MessageEmbed } = require("discord.js");
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("emojiDelete", async(emoji) => {
    let logs = await client.channels.cache.get(channelLog);
        	let embed = new MessageEmbed()
            .setTitle("Emoji Deleted")
            .setColor("GREEN")
            .setDescription(`A custom emoji was deleted.`)
            .addField("Emoji Name", emoji.name, true)
            .addField("Emoji ID", emoji.id, true) 
            .addField("Animted Emoji?", emoji.animated)
            return logs.send(embed);
    })
}