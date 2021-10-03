const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const { suggestchannel } = require("../../config/constants/channel.json");

module.exports = {
  name: "name",
  description: "description",
  aliases: ["alias_a", "alias_b"],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    const error = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("Please mention a member")
    ;
    const spoonfeed = args.join(message.mentions.members.first());
    if (!spoonfeed) return message.channel.send(error).then(msg => msg.delete({ timeout: 10000}))
    const embed = new Discord.MessageEmbed()
      .setTitle(`Spoon Feeding`)
      .setColor("RED")
      .setDescription(`Stop spoonfeeding ${spoonfeed}!`)
      .addField("Why?", `Spoon Feeding is bad as it This leads to poor performance in initial jobs and slow's down their progress. Constantly helping people out with the information they need will stop them  thinking on there own and will force them to be dependent on others`)
      .setFooter(client.user.tag, client.user.avatarURL())
    message.channel.send(embed)

  }

}