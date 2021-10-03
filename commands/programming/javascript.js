const Discord = require("discord.js");
const { javascriptchannel } = require("../../config/constants/channel.json")
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "javascript",
  description: "javascript links",
  aliases: [],
  category: "programming", 
  clientPermissions: [],
  userPermissions: [],
  run: async (client, message, data, command) => {

    message.delete()
    const error = new Discord.MessageEmbed()
    .setTitle("Error")
    .setDescription("Command is restricted here!")

    const javascriptembed = new Discord.MessageEmbed()
    .setTitle(`Javascript Links`)
    .setDescription(`[Node](https://nodejs.org/en/docs/)\n[TypeScript](https://www.typescriptlang.org/docs/)\n[Javascript Tutorials](https://javascript.info/)`)

    if (message.channel.id !== javascriptchannel) {
      const m = await message.channel.send({ embeds: [error] });
      return setTimeout(() => m.delete(), 5000);
    }

    message.channel.send({ embeds: [javascriptembed] });

  }
}