const { channelLog } = require("../config/constants/channel.json")
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "guildMemberKicked",
	runOnce: false,
	call(_client, args){
		channelLog.send({embed: new MessageEmbed({
			title: "User kicked",
			fields: [
				{
					name: "Who was kicked",
					value: args[0]
				},
				{
					name: "Kicked by",
					value: args[1]
				},
				{
					name: "Reason",
					value: args[2] ? args[2] : "Unspecified"
				}
			]
		})})
	}
}