const { MessageEmbed } = require("discord.js");
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("roleDelete", async(role) => {
    let logs = await client.channels.cache.get(channelLog);
        	let embed = new MessageEmbed()
            .setTitle("Role Deleted")
            .setColor(role.hexColor)
            .addField("Role Name", role.name, true)
            .addField("Role ID", role.id, true)
        	.addField("Role Hex Color", role.hexColor)
            .addField("Role Was Hoisted?", role.hoist)
            .addField("Role Was Mentionable By Everyone?", role.mentionable)
            .addField("Role Position", role.position)
            return logs.send(embed);
    })
}