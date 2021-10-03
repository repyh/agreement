const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
var Fakerator = require("fakerator");
var fakerator = Fakerator();
const { staffrole, adminrole, breakrole } = require("../../config/constants/roles.json");


module.exports = {
    name: "fakeprofile",
    description: "generates a fake profile",
    aliases: ["fakeinfo"],
    category: "utility", 
    clientPermissions: [],
    userPermissions: [],
    run: (client, msg, data) => {
        const args = data["args"];
        message.delete();
        let fakeprofile = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setTitle(`Fake profile`)
        .addFields(`General information`, `**Name:** ${fakerator.names.name()}\n**Country:** ${fakerator.address.country()}\n**City:** ${fakerator.address.city()}\n**Street:** ${fakerator.address.street()}`)
    }
}