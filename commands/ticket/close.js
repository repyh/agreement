const { Message, Client, MessageAttachment} = require('discord.js')
const { ticketCategory } = require("../../config/constants/channel.json");
const fs = require('fs')
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "close",
  description: "closes a ticket",
  aliases: [],
  category: "ticket", 
  clientPermissions: [],
  userPermissions: [],
  run: async (client, message, data) => {
    message.delete();
    let delete1 = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Deletion`)
        .setDescription(`Ticket Will be deleted in 5 seconds`)
    ;
    if(message.channel.parentID !== ticketCategory) {
      const m = await message.channel.send({ embeds: [delete1] });
      return setTimeout(() => m.delete(), 5000);
    }

    setTimeout(() => {
      message.channel.delete()
    }, 5000)

  }
}