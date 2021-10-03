const { MessageEmbed } = require("discord.js");
const { channelLog } = require("../config/constants/channel.json")

module.exports = (client) => {
	client.on("guildMemberUpdate", async(Old, New) => {
 	   let logs = await client.channels.cache.get(channelLog);
	   if(Old.user.tag !== New.user.tag || Old.displayName !== New.displayName || Old.user.username !== New.user.username){
    	   let embed = new MessageEmbed()
            .setTitle("Member Updated")
            .setColor("GREEN")
            if(Old.user.tag !== New.user.tag){
                embed.addField("Old User Tag", Old.user.tag)
                embed.AddField("New User Tag", New.user.tag)
            }else{
                embed.addField("User Tag", Old.user.tag)
            }
        	if(Old.displayName !== New.displayName){
                embed.addField("Old Nickname", Old.nickname)
                embed.addField("New Nickname", New.nickname)
            }   	
        	if(Old.user.username !== New.user.username){
                embed.addField("Old Username", Old.user.username)
                embed.addField("New Username", New.user.username)
            }
        	
            embed.setThumbnail(New.user.displayAvatarURL({ dynamic: true }))
            return logs.send(embed);
        }
    })
}
