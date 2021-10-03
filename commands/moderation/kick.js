const moment = require("moment");
const Enmap = require("enmap");
require("moment-duration-format");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const makeID = require("../../events/caseid.js");
const { staffrole } = require("../../config/constants/roles.json");
const { channelLog } = require("../../config/constants/channel.json");
const { serverID } = require("../../config/main.json");

module.exports = {
  name: "kick",
  category: "moderation",
  aliases: [],
  usage: "<User ID/@mention> <reason>",
  description: "Kick a member",
  run: async (client, msg, args, prefix, command) => {
    msg.delete();
    const warnsDB = new Enmap({ name: "warns" });
    const cannedMsgs = new Enmap({ name: "cannedMsgs" });
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
      .setDescription(`Mention a valid reason to kick the user`);
    let cantkickyourself = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`You cant kick yourself`);
    let samerankorhigher = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`You can't kick that user due to role hierarchy`);
    const server = client.guilds.cache.get(serverID);
    if (!msg.member.roles.cache.has(staffrole))
      return msg
        .reply(Prohibited)
    const toWarn =
      msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    const moderator = msg.member;
    if (!toWarn)
      return msg
        .reply(validuser)
    warnsDB.ensure(toWarn.id, { warns: {} });
    let reason = args.join(" ").replace(args[0], "").trim();
    if (!reason)
      return msg
        .reply(stateareason)
    if (cannedMsgs.has(reason)) reason = cannedMsgs.get(reason);
    if (moderator.id == toWarn.id) return msg.reply(cantkickyourself);
    if (
      server.member(moderator.id).roles.highest.rawPosition <=
      (server.member(toWarn.id)
        ? server.member(toWarn.id).roles.highest.rawPosition
        : 0)
    )
      return msg
        .reply(samerankorhigher)
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
      .addField("Member", `${toWarn.user.tag} (${toWarn.id})`)
      .addField("Moderator", `${moderator.user.tag} (${moderator.id})`)
      .addField("Reason", `\`(kicked) - ${reason}\``)
      .setFooter(`By: ${moderator.user.tag} (${moderator.id})`);
    await warnLogs.send(em);
    const Server = msg.member.guild.name;
    const emUser = new MessageEmbed()
      .setTitle("Kicked")
      .setColor("RED")
      .setDescription(
        `You were kicked from ${Server} for ${reason}, please don't do it again!`
      )
      .addField("Case ID", `\`${caseID}\``);
    await toWarn.send(emUser).catch((err) => err);
    const emChan = new MessageEmbed()
      .setDescription(`You have succesfully kicked **${toWarn.user.tag}**.`)
      .setColor(Color);
    await msg.channel
      .send({embeds: [emChan]})
    warnsDB.set(
      toWarn.id,
      {
        moderator: moderator.id,
        reason: `(kicked) - ${reason}`,
        date: moment(Date.now()).format("LL"),
      },
      `warns.${caseID}`
    );
    return toWarn.kick(reason);
  },
};
