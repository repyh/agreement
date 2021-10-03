const moment = require("moment");
const Enmap = require("enmap");
const makeID = require("../../events/caseid.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const { staffrole } = require("../../config/constants/roles.json");
const { channelLog } = require("../../config/constants/channel.json");
const { serverID } = require("../../config/main.json");

module.exports = {
  name: "ban",
  description: "<User ID/@mention> <reason>",
  aliases: [],
  category: "moderation",
  clientPermissions: [],
  userPermissions: [],
  run: async (client, msg, args) => {
    let Prohibited = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Prohibited User`)
      .setDescription(
        `You have to be in the moderation team to be able to use this command!`
      );
    let validuser = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`Mention a valid user`);
    let stateareason = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`Mention a valid reason to ban the user`);
    let cantbanyourself = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`You cant ban yourself`);
    let samerankorhigher = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`You can't ban that user due to role hierarchy`);
    const warnsDB = new Enmap({ name: "warns" });
    const cannedMsgs = new Enmap({ name: "cannedMsgs" });
    const server = client.guilds.cache.get(serverID);
    if (!msg.member.roles.cache.has(staffrole)) return msg.reply(Prohibited);
    if (!msg.mentions.members && !client.users.cache.get(args[0])) {
      await client.users.fetch(args[0]);
    }
    const toWarn =
      msg.mentions.users.first() || client.users.cache.get(args[0]);
    const moderator = msg.member;
    if (!toWarn) return msg.reply(validuser);
    warnsDB.ensure(toWarn.id, { warns: {} });
    let reason = args.join(" ").replace(args[0], "").trim();
    if (!reason)
      return msg.reply(
        stateareason
      );
    if (cannedMsgs.has(reason)) reason = cannedMsgs.get(reason);
    if (moderator.id == toWarn.id)
      return msg.reply(cantbanyourself);
    if (
      server.member(moderator.id).roles.highest.rawPosition <=
      (server.member(toWarn.id)
        ? server.member(toWarn.id).roles.highest.rawPosition
        : 0)
    )
      return msg.reply(
        samerankorhigher
      );
    const warnLogs = server.channels.cache.get(channelLog);
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const caseID = makeid(10);
    const em = new MessageEmbed()
      .setTitle(`Case - ${caseID}`)
      .setColor("GREEN")
      .setauthor(`https://img.icons8.com/fluency/2x/restriction-shield.png`)
      .addField("Member", `${toWarn.tag} (${toWarn.id})`)
      .addField("Moderator", `${moderator.user.tag} (${moderator.id})`)
      .addField("Reason", `\`(banned) - ${reason}\``)
      .setFooter(`By: ${moderator.user.tag} (${moderator.id})`)
    await warnLogs.send(em);
    const emUser = new MessageEmbed()
      .setTitle("Banned")
      .setColor("GREEN")
      .setThumbnail("")
      .setDescription(`You were banned from **server** for ${reason}!`)
      .addField("Case ID", `\`${caseID}\``)
      .addField("Ban Appeal Server", "[Join Me]()")
    await toWarn.send(emUser).catch((err) => err);
    const emChan = new MessageEmbed()
      .setDescription(`You have succesfully banned **${toWarn.tag}**.`)
      .setColor("GREEN")
    await msg.channel.send({ embed: [emChan] });
    warnsDB.set(
      toWarn.id,
      {
        moderator: moderator.id,
        reason: `(banned) - ${reason}`,
        date: moment(Date.now()).format("LL"),
      },
      `warns.${caseID}`
    );
    return client.guilds.cache
      .get(serverID)
      .members.ban(toWarn, { reason: reason });
  },
};