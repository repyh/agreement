const moment = require("moment");
const Enmap = require("enmap");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const makeID = require("../../events/caseid.js");
require("moment-duration-format");
const {
  staffrole,
  mutedrole,
  adminrole,
} = require("../../config/constants/roles.json");
const { channelLog } = require("../../config/constants/channel.json");
const { serverID } = require("../../config/main.json");

module.exports = {
  name: "mute",
  category: "moderation",
  aliases: [],
  usage: "<User ID/@mention> <duration (seconds)> <reason>",
  description: "Mute a member",
  run: async (client, msg, args, prefix, command) => {
    let Prohibited = new Discord.MessageEmbed()
      .setColor(Color)
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
      .setDescription(`Mention a valid reason to mute the user`);
    let cantmuteyourself = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`You cant mute yourself`);
    let samerankorhigher = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`You can't mute that user due to role hierarchy`);
    let durationtime = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(
        `How long would you like to mute the user for (write 0 if you wish to permanently mute the user)`
      );
    const warnsDB = new Enmap({ name: "warns" });
    const mutedDB = new Enmap({ name: "mutes" });
    const cannedMsgs = new Enmap({ name: "cannedMsgs" });
    const server = client.guilds.cache.get(serverID);
    if (!msg.member.roles.cache.has(staffrole))
      return msg
        .reply(
          "You have to be with the moderation team to be able to use this command!"
        )
    const toWarn =
      msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    const moderator = msg.member;
    if (!toWarn)
      return msg
        .reply("Please insert a member to mute!")
    warnsDB.ensure(toWarn.id, { warns: {} });
    mutedDB.ensure(toWarn.id, { roles: [], duration: 0, mutedAt: 0, id: 0 });
    let duration = args[1];
    if (!duration)
      return msg
        .reply(
          "Please insert the duration you want to mute this member for (insert 0 for perm)!"
        )
    if (!/^\d+$/.test(duration))
      return msg
        .reply(
          "Please insert the duration you want to mute this member for (insert 0 for perm)!"
        )
        .then((d) => d.delete({ timeout: 5000 }))
        .then(msg.delete({ timeout: 2000 }));
    if (duration == "0") duration = "100000000000";
    let reason = args
      .join(" ")
      .replace(args[0], "")
      .replace(args[1], "")
      .trim();
    if (!reason)
      return msg
        .reply("Please insert the reason you want to mute this member for!")
    if (cannedMsgs.has(reason)) reason = cannedMsgs.get(reason);
    if (moderator.id == toWarn.id)
      return msg.reply("You may not mute yourself dumby!");
    if (
      server.member(moderator.id).roles.highest.rawPosition <=
      (server.member(toWarn.id)
        ? server.member(toWarn.id).roles.highest.rawPosition
        : 0)
    )
      return msg
        .reply(
          "You may not mute someone with the same rank or a rank higher as yourself!"
        )
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
    mutedDB.set(toWarn.id, {
      roles: msg.guild
        .member(toWarn.id)
        .roles.cache.array()
        .filter(
          (r) => r.id != "720661480143454340" && r.id != "757759707674050591"
        )
        .map((r) => r.id),
      duration: duration * 1000,
      mutedAt: Date.now(),
      id: toWarn.id,
    });
    const caseID = makeid(10);
    const em = new MessageEmbed()
      .setTitle(`Case - ${caseID}`)
      .setColor("ORANGE")
      .addField("Member", `${toWarn.user.tag} (${toWarn.id})`)
      .addField("Moderator", `${moderator.user.tag} (${moderator.id})`)
      .addField("Reason", `\`(muted) - ${reason}\``)
      .addField(
        "Duration",
        moment
          .duration(duration, "seconds")
          .format("d [days], h [hours], m [minutes] [and] s [seconds]")
      )
      .setFooter(`By: ${moderator.user.tag} (${moderator.id})`)
      .setTimestamp();
    await warnLogs.send({embeds: [em]});
    const emUser = new MessageEmbed()
      .setTitle("Muted")
      .setColor("ORANGE")
      .setDescription(
        `You were muted in **${server}** for ${reason}, please don't do it again!`
      )
      .addField(
        "Duration",
        moment
          .duration(duration, "seconds")
          .format("d [days], h [hours], m [minutes] [and] s [seconds]")
      )
      .addField("Case ID", `\`${caseID}\``)
      .setTimestamp();
    await toWarn.send({embeds: [emUser]}).catch((err) => err);
    const emChan = new MessageEmbed()
      .setDescription(`You have succesfully muted **${toWarn.user.tag}**.`)
      .setColor("ORANGE")
      .setTimestamp();
    await msg.channel
      .send({embeds: [emChan]})
    warnsDB.set(
      toWarn.id,
      {
        moderator: moderator.id,
        reason: `(muted) - ${reason}`,
        date: moment(Date.now()).format("LL"),
      },
      `warns.${caseID}`
    );
    return msg.guild.member(toWarn.id).roles.set(["795934921717710879"]);
  },
};
