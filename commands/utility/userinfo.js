const moment = require("moment");
const Enmap = require('enmap');
require("moment-duration-format");

module.exports = {
  name: "userinfo",
  description: "userinfo",
  aliases: [],
  category: "utility",
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    const server = msg.guild;
    const statusMoji = {
      dnd: '<:dnd:817030828290867231>',
      offline: '<:offline:817030793142337536>',
      online: '<:online:817030844584951879>',
      idle: '<:idle:817030811853389926>'
    }
    const statusName = {
      dnd: 'Do not Disturb',
      offline: 'Offline',
      online: 'Online',
      idle: 'Idle'
    }
    const device = {
      mobile: '<:mobile:817032273463476224>',
      browser: '<:browser:817032290731032597>',
      desktop: '<:desktopicon:817032252390899752>'
    }
    let member;
    if (args[0]) member = server.members.cache.get(args[0]) ||
      server.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()) ||
      server.members.cache.find(m => m.user.tag.toLowerCase() == args[0].toLowerCase()) ||
      server.members.cache.find(m => m.displayName.toLowerCase() == args[0].toLowerCase()) ||
      msg.mentions.members.first() || false;
    if (!args[0]) member = msg.member;
    if (member) {
      const em = new MessageEmbed()
        .setAuthor(`${member.displayName}'s information`, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor(color)
        .addField("Username", member.user.username, true)
        .addField("Tag", member.user.tag, true)
        .addField(`Created At [${moment(member.user.createdTimestamp).fromNow()}]`, moment(member.user.createdTimestamp).format('LLL'))
        .addField(`Joined Server At [${moment(member.joinedTimestamp).fromNow()}]`, moment(member.joinedTimestamp).format('LLL'))
        .addField("Status", `${statusMoji[member.user.presence.status]} ${statusName[member.user.presence.status]}`, true)
        .addField("Main Device", `${device[Object.keys(member.user.presence.clientStatus)[0]]} ${Object.keys(member.user.presence.clientStatus)[0].toProperCase()}`, true);
      if (member.user.presence.activities[0] && member.user.presence.activities[0].name !== 'Custom Status') em.addField("Activity", `${member.user.presence.activities[0].type.toProperCase()} ${member.user.presence.activities[0].name}`);
      if (msg.member.id != member.id) {
        em.setFooter(`Requested by ${msg.member.displayName}`);
      }
      msg.channel.send({ embeds: [em] });
    } else {
      let user = msg.author;
      if (args[0]) user = client.users.cache.get(args[0]) || msg.author;
      const em = new MessageEmbed()
        .setAuthor(`${user.username}'s information`, user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor(color)
        .addField("Username", user.username, true)
        .addField("Tag", user.tag, true)
        .addField(`Created At [${moment(user.createdTimestamp).fromNow()}]`, moment(user.createdTimestamp).format('LLL'))
        .setFooter(`Requested by ${msg.member.displayName}`);
      msg.channel.send(em);
    }
  }
}