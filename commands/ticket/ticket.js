const { ticketCategory } = require("../../config/constants/channel.json");
const { Client, Message } = require('discord.js')
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "creates a dedicated ticket",
  aliases: [],
  category: "ticket", 
  clientPermissions: [],
  userPermissions: [],
  run: (message, data) => {

    message.delete();
    let welcome = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(`Welcome ${message.author.username}`)
    .setDescription(`Support will be with you shortly.\nTo close this ticket react with <:bsod:811223704406327386>`)
      
    let onechannel = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(`Error`)
    .setDescription(`You already have a ticket open`)

    const ch = message.guild.channels.cache.find(ch => ch.name === message.author.username)
    if (ch) return message.channel.send({ embeds: [onechannel] });

    message.guild.channels.create(`${message.author.username}`, {
      type: 'text',
      parent: ticketCategory,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL']
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
        },
        {
          id: message.guild.roles.cache.find(role => role.name === "Support"),
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        }
      ]
    }).then(async channel => {
      let viewchannel = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle(`Ticket`)
      .setDescription(`You can view your ticket at <#${channel.id}>`)

      message.channel.send({ embeds:[viewchannel] }).then(msg => msg.delete({ timeout: 10000 }))
      channel.send(welcome).then(msg => {
        msg.react("<:envelope:811223704406327386>")
        const filter = (reaction, user) => user.id === message.author.id && reaction.emoji.id === "811223704406327386"
        msg.awaitReactions(filter, { max: 1 }).then(async (cls) => {
          let delete1 = new Discord.MessageEmbed()
          .setColor(Color)
          .setTitle(`Deletion`)
          .setDescription(`Ticket Will be deleted in 5 seconds`)

          await msg.channel.send({ embeds: [delete1] })
          setTimeout(() => {
            msg.channel.delete()
          }, 5000)
        })
      })
    })
  }
}