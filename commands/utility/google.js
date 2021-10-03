const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
  name: "google",
  description: "google",
  aliases: [],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    msg.delete();
  const ask = new Discord.MessageEmbed()
        .setTitle("Google")
        .setDescription("Please make sure you checked your question on google before you ask it here, as some questions might be easily answered on google")
    ;
    msg.channel.send({ embeds: [ask] })
  }
}