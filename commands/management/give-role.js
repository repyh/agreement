const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { adminrole } = require("../../config/constants/roles.json");
const { Color } = require("../../config/constants/other.json");

module.exports = {
  name: "giverole",
  description: "description",
  aliases: [],
  category: "management",
  clientPermissions: [],
  userPermissions: [],
  run: (client, message, data) => {
    message.delete();
    let Prohibited = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Prohibited User`)
      .setDescription(`You are prohibited from doing this command`);
    let AlreadyHas = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`User already has that role`);
    let Error = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`Error - Use format giverole <member> <role>`);
    let RoleError = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(`Error`)
      .setDescription(`Role doesnt exist`);
    if (!message.member.roles.cache.has(adminrole)) return Prohibited;

    if (!data.args[0] || !data.args[1]) return message.channel.send(Error);

    try {
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(data.args[0]);
      const roleName = message.guild.roles.cache.find(
        (r) =>
          r.name === data.args[1].toString() ||
          r.id === data.args[1].toString().replace(/[^\w\s]/gi, "")
      );

      const alreadyHasRole = member._roles.includes(roleName.id);

      if (alreadyHasRole)
        return message.channel
          .send(AlreadyHas)
          .then((message) => message.delete({ timeout: 5000 }));

      const embed = new MessageEmbed()
        .setTitle(`Role successfully recieved`)
        .setColor(Color)
        .setDescription(
          `**Moderator:** ${message.author}\n**Role Recieved:** ${roleName}\n**Member:** ${member.user}`
        );
      return member.roles.add(roleName).then(() => message.channel.send(embed));
    } catch (e) {
      return message.channel
        .send({embeds: [RoleError]})
    }
  },
};
