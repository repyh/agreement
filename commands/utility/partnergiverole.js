const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { partnermanagerrole, partnerrole } = require("../../config/constants/roles.json");
const { Color, serverID } = require("../../config/constants/other.json")



module.exports = {
    name: "partnergiverole",
    description: "allows partner managers to give the partner role and removes it",
    aliases: ["pgr", "partner"],
    category: "utility", 
    clientPermissions: [],
    userPermissions: [],
    run: (client, msg, data) => {
        const args = data["args"];
        let AlreadyHas = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Error`)
            .setDescription(`User already has that role`)
            ;
        let Prohibited = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Prohibited User`)
            .setDescription(`You are prohibited from doing this command`)
            ;
        if (!message.member.roles.cache.has(partnermanagerrole)) return (Prohibited);

        if (!args[0] || !args[1]) return message.channel.send(Error)

        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const partnerRole = message.guild.roles.cache.get(partnerrole)
            let userPartnerRole = member.roles.cache.get(partnerRole)
            if (!userPartnerRole){
                member.roles.fetch(partnerRole.id).then(role => {
                    userPartnerRole = role
                })
            }
            // if member role cache does not contain partner role, attempt to fetch it
            if (!userPartnerRole){ // user doesn't have role
                member.roles.add(partnerRole).then(() => message.channel.send("Successfully gave role!"));
            } else {
                member.roles.remove(partnerRole).then(() => message.channel.send("Successfully removed role."));
            }
        } catch (e) {
            return message.channel.send(RoleError).then(message => message.delete({ timeout: 5000 }))
        }
    }
}