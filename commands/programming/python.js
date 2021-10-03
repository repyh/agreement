const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const { pythonchannel } = require("../../config/constants/channel.json")

module.exports = {
  name: "python",
  description: "python links",
  aliases: [],
  category: "programming", 
  clientPermissions: [],
  userPermissions: [],
  run: async (client, message, data, command) => {

    message.delete()
    const error = new Discord.MessageEmbed()
    .setTitle("Error")
    .setDescription("Command is restricted here!")

    const pythonembed = new Discord.MessageEmbed()
    .setTitle(`Python Links`)
    .setDescription(`[**Python**](https://www.python.org/)\n[**Codecademy**](https://www.codecademy.com/catalog/language/python)\n[**W3schools**](https://www.w3schools.com/python/default.asp)\n[**Python Packages**](https://pypi.org/)\n[**Real Python**](https://realpython.com/)\n[Programiz](https://www.programiz.com/python-programming)`)

    if (message.channel.id !== pythonchannel) {
      const m = await message.channel.send({ embeds: [error] });
      return setTimeout(() => m.delete(), 5000);
    }

    message.channel.send(pythonembed)

  }
}