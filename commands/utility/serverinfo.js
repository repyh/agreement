const moment = require("moment");
const Enmap = require('enmap');
require("moment-duration-format");
const { adminrole, staffrole } = require("../../config/constants/roles.json");
const { Color, serverID } = require("../../config/constants/other.json")

module.exports = {
  name: "serverinfo",
  description: "lists information about the server",
  aliases: ["sinfo", "infoserver"],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];
    const server = msg.guild;
    const regions = {

    };
    const boosterEmoji = '<:booster:817062258781454347>';
    const boostersCount = server.premiumSubscriptionCount;
    const boosterLevel = server.premiumTier;
    const serverOptions = server.features.join(', ').replace(/_/g, ' ').split(', ').join(' | ').toProperCase();
    const memberCount = server.memberCount.toLocaleString();
    const staffCount = server.members.cache.filter(m => m.roles.cache.has(staffrole)).size.toLocaleString();
    const managerCount = server.members.cache.filter(m => m.roles.cache.has(adminrole)).size.toLocaleString();
    const textChannels = server.channels.cache.filter(c => c.type == 'text').size.toLocaleString();
    const voiceChannels = server.channels.cache.filter(c => c.type == 'voice').size.toLocaleString();
    const categories = server.channels.cache.filter(c => c.type == 'category').size.toLocaleString();
    const roleCount = server.roles.cache.size.toLocaleString();
    const humanCount = server.members.cache.filter(m => !m.user.bot).size.toLocaleString();
    const botsCount = server.members.cache.filter(m => m.user.bot).size.toLocaleString();
    const em = new MessageEmbed()
    .setTitle(server.name)
    .setThumbnail(server.iconURL({ format: 'png', dynamic: true }))
    .setColor(color)
    .addField("Owner", server.owner.user.tag)
    .addField("ID", server.id)
    .addField("Staff Count", staffCount)
    .addField("Manager Count", managerCount)
    .addField("Role Count", roleCount)
    .addField(`Created At [${moment(server.createdTimestamp).fromNow()}]`, moment(server.createdTimestamp).format('LLL'))
    .addField(`Boosters [${boostersCount}]`, `${boosterEmoji} Level ${boosterLevel}`)
    .addField(`Members [${memberCount}]`, `👤 ${humanCount} | 🤖 ${botsCount}`)
    .addField(`Channels [${server.channels.cache.size.toLocaleString()}]`, `⌨️ ${textChannels} | 🗣️ ${voiceChannels} | 📂 ${categories}`)
    .addField("Options", server.features.length > 0 ? serverOptions : "None");
    msg.channel.send(em);
  }
}