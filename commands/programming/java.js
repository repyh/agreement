const Discord = require("discord.js");
const { javachannel } = require("../../config/constants/channel.json")
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "java",
  description: "java links",
  aliases: [],
  category: "programming", 
  clientPermissions: [],
  userPermissions: [],
  run: async (client, message, data, command) => {

    message.delete()
    const error = new Discord.MessageEmbed()
    .setTitle("Error")
    .setDescription("Command is restricted here!")

    const javaembed = new Discord.MessageEmbed()
    .setTitle(`Java Links`)
    .setDescription(`[Java](https://www.java.com/en/)`)

    if (message.channel.id !== javachannel) {
      const m = await message.channel.send({ embeds: [error] });
      return setTimeout(() => m.delete(), 5000);
    }

    message.channel.send({ embeds: [javaembed] })

  }

}