const moment = require('moment');
const discord = require('discord.js')
const Discord = require('discord.js')
const { MessageEmbed } = require ('discord.js')
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");
const { discordlink, serverID } = require("../../config/main.json")

module.exports = {
  name: "help",
  description: "lists all of the commands",
  aliases: [],
  category: "utility", 
  clientPermissions: [],
  userPermissions: [],
  run: (client, msg, data) => {
    const args = data["args"];

    msg.delete();
    function ChangeLatter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let cmdmanagement = client.commands.filter(command => command.category === "management").map();
    let cmdfun = client.commands.filter(command => command.category === "misc").map();
    let cmdmod = client.commands.filter(command => command.category === "moderation").map();
    let cmdutility = client.commands.filter(command => command.category === "utility").map();

    let embedhelp = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`${client.user.username} - Help Section!`)
      .setDescription(`Below you can see the current Command Categories\nyou can also see basic server information`)
      .addFields(
        { name: 'Command Categories', value: 'Management\nModeration\nUtility', inline: true },
		    { name: 'Server information', value: `[Server Invite](${discordlink})`, inline: true },
      )
    ;

    let managementembed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`Management Section!`)
    ;
    let miscembed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`Misc Section!`)
    ;
    let modembed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`Moderation Section!`)
    ;
    let utilityembed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`Utility Section!`)
    ;
    cmdmanagement.forEach((cmd) => {
      managementembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    });

    cmdfun.forEach((cmd) => {
      miscembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    });

    cmdmod.forEach((cmd) => {
      modembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    });

    cmdutility.forEach((cmd) => {
      utilityembed.addField(
        `${ChangeLatter(cmd.name)}`,
        `${ChangeLatter(cmd.description)}`
      )
    });

    if (!args[0]) {
      return msg.channel.send({ embeds: [embedhelp] })
    }

    if (args[0].toLowerCase() === "management") {
      return msg.channel.send(managementembed).then(msg => msg.delete({ timeout: 50000}))
    }
    if (args[0].toLowerCase() === "Management") {
      return msg.channel.send(managementembed).then(msg => msg.delete({ timeout: 50000}))
    }
    if (args[0].toLowerCase() === "misc") {
      return msg.channel.send(miscembed).then(msg => msg.delete({ timeout: 50000}))
    }
    if (args[0].toLowerCase() === "Misc") {
      return msg.channel.send(miscembed).then(msg => msg.delete({ timeout: 50000}))
    };
    if (args[0].toLowerCase() === "miscellaneous") {
      return msg.channel.send(miscembed).then(msg => msg.delete({ timeout: 50000}))
    };
    if (args[0].toLowerCase() === "Miscellaneous") {
      return msg.channel.send(miscembed).then(msg => msg.delete({ timeout: 50000}))
    };
    if (args[0].toLowerCase() === "moderation") {
      return msg.channel.send(modembed).then(msg => msg.delete({ timeout: 50000}))
    }
    if (args[0].toLowerCase() === "Moderation") {
      return msg.channel.send(modembed).then(msg => msg.delete({ timeout: 50000}))
    }
    if (args[0].toLowerCase() === "mod") {
      return msg.channel.send(modembed).then(msg => msg.delete({ timeout: 50000}))
    };
    if (args[0].toLowerCase() === "Mod") {
      return msg.channel.send(modembed).then(msg => msg.delete({ timeout: 50000}))
    };
    if (args[0].toLowerCase() === "Utility") {
      return msg.channel.send(utilityembed).then(msg => msg.delete({ timeout: 50000}))
    };
    if (args[0].toLowerCase() === "utility") {
      return msg.channel.send(utilityembed).then(msg => msg.delete({ timeout: 50000}))
    };

    let cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

    if (!cmd) return msg.channel.send(embedhelp).then(msg => msg.delete({ timeout: 50000}))

    if (cmd.aliases === null) cmd.aliases = ``;
    if (cmd.description.length === 0) cmd.description = `N/A`;
    if (cmd.category === null) cmd.category = `No Category!`;
    if (cmd.name === null) return msg.channel.send(`Something Went Wrong!`);

    let cmdhelp = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Command Information!`)
      .addField(`Name`, `${ChangeLatter(cmd.name)}`)
      .addField(`Usage`, `${cmd.usage}`)
      .addField(`Category`, `${ChangeLatter(cmd.category)}`)
      .addField(`Description`, `${cmd.description}`)
    ;
    if (cmd) {
      return msg.channel.send(cmdhelp).then(msg => msg.delete({ timeout: 50000}))
    } else {
      return msg.channel.send(embedhelp).then(msg => msg.delete({ timeout: 50000}))
    }
    //End
  }
};
