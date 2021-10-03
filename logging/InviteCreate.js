const { MessageEmbed } = require("discord.js");
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("inviteCreate", async(invite) => {
    let logs = await client.channels.cache.get(channelLog);
        	let embed = new MessageEmbed()
            .setTitle("New Invite Created")
            .setColor("GREEN")
            .addField("Invite Code", invite.code, true)
            .addField("Invite URL", invite.url, true) 
            .addField("Invite Channel", invite.channel)
            if(invite.expiresAt){
                embed.addField("Invite Expires At", invite.expiresAt)
            }
        	if(invite.inviter){
                embed.addField("Inviter", `${invite.inviter.tag} | ${invite.inviter.id}`)
            }
            return logs.send(embed);
    })
}