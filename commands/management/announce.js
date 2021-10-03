const moment = require("moment");
const Enmap = require("enmap");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
require("moment-duration-format");
const { adminrole } = require("../../config/constants/roles.json");
const { Announcement } = require("../../config/constants/channel.json");

module.exports = {
  name: "announce",
  description: "announcements",
  aliases: [],
  category: "management",
  clientPermissions: [],
  userPermissions: [],
  run: async (client, message, data) => {
    let Prohibited = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Prohibited User`)
      .setDescription(`You have to be an administrator to use this command!`);
    let Description = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(
        "Make sure to include a description for the announcement! (Must be longer than 5 words)"
      );
    if (!message.member.roles.cache.has(adminrole))
      return message.reply(Prohibited).then(message.delete({ timeout: 3000 }));
    const announceChan = message.client.channels.cache.get(Announcement);
    await announceChan.messages.fetch();
    if (data.length < 5) return message.reply(Description);
    const AnnDesc = data.join(" ").trim();
    const em = new MessageEmbed().setColor("PURPLE").setDescription(AnnDesc);
    await announceChan.send({ content: "<@&865728505811304494>", embeds: [em] })
  },
};
