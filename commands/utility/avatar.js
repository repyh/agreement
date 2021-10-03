const moment = require("moment");
const Enmap = require('enmap');
require("moment-duration-format");
const Discord = require('discord.js')
const { MessageEmbed } = require ('discord.js')
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");

module.exports = {
  name: "avatar",
  description: "lists a members avater",
  aliases: [],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    const server = msg.guild;
    let member;
    if (!args[0]) member = msg.member;
    if (args[0]) member = server.members.cache.get(args[0]) || 
    server.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()) || 
    server.members.cache.find(m => m.user.tag.toLowerCase() == args[0].toLowerCase()) || 
    server.members.cache.find(m => m.displayName.toLowerCase() == args[0].toLowerCase()) || 
    msg.mentions.members.first() || msg.member;
    const em = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Showing ${member.displayName}'s avatar`)
    .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: true }));
    if (msg.member.id != member.id) {
      em.setFooter(`Requested by ${msg.member.displayName}`);
    }
    msg.channel.send(em);
  }
}